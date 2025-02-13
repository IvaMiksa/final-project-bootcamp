import PropertyCard from "../../../components/Cards/PropertyCard.jsx";
import {StyledContainer, StyledContainerRow, StyledLink, StyledHeaderRow} from "./SearchResultsPageStyle.js";
import React, {useEffect, useMemo, useState} from "react";
import {useSearchParams} from 'react-router-dom';
import DateSelect from "../../../components/Input/DateSelect.jsx";
import {AxiosInstance} from "../../../utils/axios.js";
import {parse, format} from 'date-fns';
import CityCountryMultiSelect from "../../../components/Input/CityCountryMultiSelect.jsx";
import Sort from "../../../components/Sort/Sort.jsx";
import PriceSlider from "../../../components/Filters/PriceSlider.jsx"; // Import PriceSlider
import SizeSlider from "../../../components/Filters/SizeSlider.jsx";
import { useSelector} from "react-redux"; // Import SizeSlider

const SearchResultsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const {initiallySelectedOptions, initialFrom, initialTo} = useMemo(() => {
        let parsedLocations = [];
        let from = null;
        let to = null;

        try {
            if (searchParams.get('locations')) {
                parsedLocations = JSON.parse(searchParams.get('locations'));
            }
            if (searchParams.get('from')) from = parse(searchParams.get('from'), 'dd-MM-yyyy', new Date());
            if (searchParams.get('to')) to = parse(searchParams.get('to'), 'dd-MM-yyyy', new Date());
        } catch (error) {
            console.info('Failed to parse search parameters:', error);
        }

        return {
            initiallySelectedOptions: parsedLocations,
            initialFrom: from,
            initialTo: to,
        };
    }, [searchParams]);

    const filterProperties = (propertyList, locations, fromDate, toDate, priceRange, sizeRange) => {
        let filteredList = propertyList;


        if (locations.length > 0) {
            filteredList = filteredList.filter((property) =>
                locations.includes(`${property.city}, ${property.country}`)
            );
        }


        if (fromDate && toDate) {
            filteredList = filteredList.filter((property) => {
                if (!property.bookings?.length) return true;

                return !property.bookings
                    .some((booking) => fromDate < new Date(booking.end_date)
                        && toDate > new Date(booking.start_date)
                    );
            });
        }

        // Filter by price range
        if (priceRange.length === 2) {
            filteredList = filteredList.filter((property) =>
                property.price >= priceRange[0] && property.price <= priceRange[1]
            );
        }

        // Filter by size range
        if (sizeRange.length === 2) {
            filteredList = filteredList.filter((property) => {
                const propertySize = parseInt(property.size); // Ensure this is a valid number
                return propertySize >= sizeRange[0] && propertySize <= sizeRange[1];
            });
        }

        return filteredList;
    };

    const sortProperties = (properties, sortOption) => {
        return properties.slice().sort((a, b) => {
            if (sortOption === "priceHighToLow") return b.price - a.price;
            if (sortOption === "priceLowToHigh") return a.price - b.price;
            if (sortOption === "ratingHighToLow") return b.averageRating - a.averageRating;
            if (sortOption === "ratingLowToHigh") return a.averageRating - b.averageRating;
            return 0;
        });
    };

    const [selectedOptions, setSelectedOptions] = useState(initiallySelectedOptions);
    const [selectedDateRange, setSelectedDateRange] = useState({from: initialFrom, to: initialTo});
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [sortOption, setSortOption] = useState("priceHighToLow");
    const [priceRange, setPriceRange] = useState([10, 200]);
    const [sizeRange, setSizeRange] = useState([0, 250]); // Add state for size range
    const accessToken = useSelector(store => store.user.accessToken)
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                let response
                if(accessToken) {
                    response = await AxiosInstance.get('/property/',{
                        headers:{
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                } else {
                    response = await AxiosInstance.get('/property/')
                }

                const propertiesWithRatings = response.data.map((property) => {
                    const averageRating =
                        property.reviews?.length > 0
                            ? property.reviews.reduce((total, review) => total + review.rating, 0) / property.reviews.length
                            : 0;
                    return {...property, averageRating};
                });
                setProperties(propertiesWithRatings);
                setFilteredProperties(
                    sortProperties(
                        filterProperties(propertiesWithRatings, initiallySelectedOptions, selectedDateRange.from, selectedDateRange.to, priceRange, sizeRange),
                        sortOption
                    )
                );
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchProperties();
    }, [initiallySelectedOptions, selectedDateRange.from, selectedDateRange.to, sortOption, priceRange, sizeRange, accessToken]);

    console.log(filteredProperties)
    useEffect(() => {
        const updatedParams = new URLSearchParams();

        if (selectedOptions.length > 0) {
            updatedParams.set('locations', JSON.stringify(selectedOptions));
        }
        if (selectedDateRange.from && selectedDateRange.to) {
            updatedParams.set('from', format(selectedDateRange.from, 'dd-MM-yyyy'));
            updatedParams.set('to', format(selectedDateRange.to, 'dd-MM-yyyy'));
        }

        setSearchParams(updatedParams);

        setFilteredProperties(
            sortProperties(
                filterProperties(properties, selectedOptions, selectedDateRange.from, selectedDateRange.to, priceRange, sizeRange),
                sortOption
            )
        );
    }, [selectedOptions, selectedDateRange, properties, sortOption, priceRange, sizeRange]);

    const handleSelectionChange = (newSelection) => setSelectedOptions(newSelection);
    const handleSortChange = (event) => setSortOption(event.target.value);
    const handlePriceChange = (range) => setPriceRange(range);
    const handleSizeChange = (range) => setSizeRange(range); // Add handler for size slider

    const generatePropertyLink = (propertyId, fromDate, toDate) => {
        const formattedFromDate = fromDate ? format(fromDate, 'dd-MM-yyyy') : '';
        const formattedToDate = toDate ? format(toDate, 'dd-MM-yyyy') : '';

        return `/property/${propertyId}?from=${formattedFromDate}&to=${formattedToDate}`;
    };

    const sortOptions = [
        {value: "priceHighToLow", label: "Price: High to Low"},
        {value: "priceLowToHigh", label: "Price: Low to High"},
        {value: "ratingHighToLow", label: "Rating: High to Low"},
        {value: "ratingLowToHigh", label: "Rating: Low to High"}
    ];

    return (
        <StyledContainer>
            <StyledHeaderRow>
                <DateSelect
                    defaultDateRange={{from: new Date(), to: new Date()}}
                    onRangeSelect={(range) => setSelectedDateRange(range)}
                    onSearch={() => setFilteredProperties(
                        sortProperties(filterProperties(properties, selectedOptions, selectedDateRange.from, selectedDateRange.to, priceRange, sizeRange), sortOption)
                    )}
                />

                <CityCountryMultiSelect
                    initiallySelectedOptions={selectedOptions}
                    onChange={handleSelectionChange}
                />

                <Sort
                    options={sortOptions}
                    value={sortOption}
                    onChange={handleSortChange}
                />
            </StyledHeaderRow>

            <StyledHeaderRow>
                <PriceSlider
                    minPrice={10}
                    maxPrice={200}
                    onChange={handlePriceChange}
                />

                <SizeSlider
                    minSize={0}
                    maxSize={250}
                    onChange={handleSizeChange}
                />
            </StyledHeaderRow>

            <StyledContainerRow>
                {filteredProperties.length === 0 ? (
                    <p>No properties available based on your selected filters.</p>
                ) : (
                    filteredProperties.map((property) => (
                        <StyledLink
                            to={generatePropertyLink(property.id, selectedDateRange.from, selectedDateRange.to)}
                            key={property.id}
                        >
                            <PropertyCard
                                id={property.id}
                                user_favourite={property.user_favourite}
                                key={property.id}
                                image={property.images[0]?.content}
                                name={property.name}
                                description={property.description}
                                price={property.price}
                                rating={property.averageRating}
                                location={`${property.city}, ${property.country}`}
                                type={property.propertyType}
                                size={property.size}
                            />
                        </StyledLink>
                    ))
                )}
            </StyledContainerRow>
        </StyledContainer>
    );
};

export default SearchResultsPage;

