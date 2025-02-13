import React, {useState, useEffect} from "react";
import HostDashboardLayout from "../../Layouts/HostDashboardLayout/HostDashboardLayout.jsx";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Select from "react-select";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {AxiosInstance} from "../../../utils/axios.js";

const SelectWrapper = styled.div`
  margin-bottom: 20px;
  width: 300px;
    position: relative;
  z-index: 10; 
`;

const HostBookingsPage = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [events, setEvents] = useState([]);
    const token = useSelector((state) => state.user.accessToken);

    useEffect(() => {

        const fetchProperties = async () => {
            try {
                const response = await AxiosInstance.get("/property/me/", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const propertyOptions = response.data.map((property) => ({
                    value: property.id,
                    label: property.name,
                }));
                setProperties(propertyOptions);
                setSelectedProperty(propertyOptions[0]); // default property
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };
        fetchProperties();
    }, []);

    // Fetch bookings
    useEffect(() => {
        if (selectedProperty) {
            const fetchBookings = async () => {
                try {
                    const response = await AxiosInstance.get("bookings/", {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    // Filter bookings for the selected property
                    const filteredBookings = response.data.filter(
                        (booking) => booking.property === selectedProperty.value
                    );

                    // Map bookings to calendar events
                    const formattedEvents = filteredBookings.map((booking) => {
                        const {first_name, last_name} = booking.created_by;
                        return {
                            title: `${first_name} ${last_name} (${booking.booking_status.toUpperCase()})`,
                            start: booking.start_date,
                            end: booking.end_date,
                            color: booking.booking_status === "accepted" ? "green" : "red",
                            backgroundColor: booking.booking_status === "accepted" ? "green" : "rgba(255, 0, 0, 0.5)",
                        };
                    });
                    setEvents(formattedEvents);
                } catch (error) {
                    console.error("Error fetching bookings:", error);
                }
            };
            fetchBookings();
        }
    }, [selectedProperty, token]);

    const handlePropertyChange = (property) => {
        setSelectedProperty(property);
    };

    return (
        <HostDashboardLayout>
            <h3>Select a property</h3>

            <SelectWrapper>
                <Select
                    options={properties}
                    value={selectedProperty}
                    onChange={handlePropertyChange}
                    placeholder="Select Property"
                />
            </SelectWrapper>

            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek",
                }}
                height="auto"
            />
        </HostDashboardLayout>
    );
};

export default HostBookingsPage;
