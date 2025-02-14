import React, {useState, useEffect} from "react";
import {ComposableMap, Geographies, Geography, Marker, ZoomableGroup} from "react-simple-maps";
import axios from "axios";
import {AxiosInstance} from "../../utils/axios.js";
import styled from "styled-components";
import {useSelector} from "react-redux";

const StyledComposableMap = styled(ComposableMap)`
    width: 100%;
    height: 80vh;
`;

const StyledGeography = styled(Geography)`
    && {
        fill: #a2c1d8;

        &:hover {
            fill: #115191; //#0388d5;
        }

        &:active {
            fill: #115191;
        }
    }
`;

const StyledTodoMarker = styled(Marker)`
    circle {
        r: 2;
        fill: #186ec5;
        stroke: #fff;
        stroke-width: 1;
    }

    text {
        text-anchor: middle;
        y: -10;
        font-family: "system-ui";
        fill: #5d5a6d;
        font-size: 8px;
    }
`;

const StyledMarker = styled(Marker)`
    circle {
        r: 2;
        fill: #2bdf6a;
        stroke: #fff;
        stroke-width: 1;
    }

    text {
        text-anchor: middle;
        y: -10;
        font-family: "system-ui";
        fill: #5d5a6d;
        font-size: 8px;
    }
`;

const geoUrl = "https://unpkg.com/world-atlas@1.1.4/world/110m.json";


const WorldMap = () => {
    const [bookingsMarkers, setBookingsMarkers] = useState([]);
    const [todoMarkers, setTodoMarkers] = useState([]);
    const token = useSelector((state) => state.user.accessToken);
    const todos = useSelector((state) => state.general.todos);

    const fetchUserBookings = async () => {
        try {
            const response = await AxiosInstance.get("bookings/me", {
                headers: {Authorization: `Bearer ${token}`},
            });
            const bookings = response.data;

            // Display only completed bookings
            return bookings.filter((booking) => booking.booking_status === 'completed').map((booking) => booking.property);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            return [];
        }
    };


    const geocode = async (city, country) => {
        try {
            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${city},${country}&key=4834806b6c114918ae6bfb9790fd25bf`
            );
            const results = response.data.results;
            if (results && results.length > 0) {
                const {lat, lng} = results[0].geometry;
                return {lat, lng};
            } else {
                console.warn(`No results for ${city}, ${country}`);
                return null; //
            }
        } catch (error) {
            console.error("Error fetching geocoding data:", error);
            //return {lat: 0, lng: 0};
            return null;
        }
    };

    const fetchBookingsMarkers = async () => {
        const userPropertyIds = await fetchUserBookings();
        const response = await AxiosInstance.get("property/");
        const properties = response.data;

        const filteredProperties = properties.filter((property) =>
            userPropertyIds.includes(property.id)
        );

        const markers = await Promise.all(
            filteredProperties.map(async (property) => {
                const {city, country} = property;
                const {lat, lng} = await geocode(city, country);

                return {
                    name: property.city,
                    coordinates: [lng, lat],
                    color: "#1cd52c",
                };
            })
        );

        setBookingsMarkers(markers);
    };

    const fetchTodoMarkers = async () => {
        const markers = await Promise.all(
            todos.map(async (todo) => {
                const [city, country] = todo.text.split(", ");
                console.log(`Geocoding ${city}, ${country}`);
                const location = await geocode(city, country);
                if (location) {
                    const {lat, lng} = location;
                    console.log(`Location for ${city}, ${country}: `, {lat, lng});
                    return {
                        name: city,
                        coordinates: [lng, lat],
                        color: "#00F",
                    };
                }
                console.warn(`Failed to geocode: ${city}, ${country}`);
                return null;
            })
        );
        setTodoMarkers(markers.filter(marker => marker !== null)); // filter out null values
    };


    useEffect(() => {
        console.log("Todos in WorldMap:", todos);
        fetchBookingsMarkers();

        /*
        //hardcoded markers (temporarily)
        setTodoMarkers([
            { name: "Zagreb", coordinates: [15.9819, 45.8150], color: "#00F" },
            { name: "Paris", coordinates: [2.3522, 48.8566], color: "#00F" }
        ]);*/


        fetchTodoMarkers();
    }, [todos]);

    return (
        <StyledComposableMap /*projectionConfig={{ scale: 180 }}  */ viewBox="0 60 800 600">
            <ZoomableGroup center={[0, 20]} zoom={1} minZoom={1} maxZoom={4}>
                <Geographies geography={geoUrl}>
                    {({geographies}) =>
                        geographies.map((geo) => (
                            <StyledGeography key={geo.rsmKey} geography={geo}/>
                        ))
                    }
                </Geographies>

                {/*markers.map(({name, coordinates}, index) => (
                    <StyledMarker key={index} coordinates={coordinates}>
                        <circle r={2} fill="#F00" stroke="#fff" strokeWidth={1}/>
                        <text textAnchor="middle" y={-10}>
                            {name}
                        </text>
                    </StyledMarker>
                ))*/}

                {/* Completed booking markers */}
                {bookingsMarkers.map(({name, coordinates, color}, index) => (
                    <StyledMarker key={`booking-${index}`} coordinates={coordinates}>
                        <circle r={2} fill={color} stroke="#fff" strokeWidth={1}/>
                        <text textAnchor="middle" y={-10}>
                            {name}
                        </text>
                    </StyledMarker>
                ))}

                {/* To-do destination markers */}
                {todoMarkers.map(({name, coordinates, color}, index) => (
                    <StyledTodoMarker key={`todo-${index}`} coordinates={coordinates}>
                        <circle r={2} fill={color} stroke="#fff" strokeWidth={1}/>
                        <text textAnchor="middle" y={-10}>
                            {name}
                        </text>
                    </StyledTodoMarker>
                ))}
            </ZoomableGroup>
        </StyledComposableMap>
    );
};

export default WorldMap;
