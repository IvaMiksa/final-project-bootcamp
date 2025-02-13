import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {FaSortUp, FaSortDown} from 'react-icons/fa';
import NomadDashboardLayout from "../../Layouts/NomadDasboardLayout/NomadDashboardLayout.jsx";
import {setBookings, setProperties, setReviews} from "../../../store/slices/generalSlice.js";
import {useDispatch, useSelector} from "react-redux";
import NomadReviewModal from "../../../components/NomadReviewModal.jsx";
import NomadStarRating from "../../../components/NomadStarRating.jsx";
import {AxiosInstance} from "../../../utils/axios.js";
// import {toast} from "react-toastify";


const FilterContainer = styled.div`
    margin-bottom: 20px;
`;

const FilterLabel = styled.label`
    margin-right: 10px;
    font-weight: bold;
    color: #666;
    margin-left: 10px;
`;

const FilterSelect = styled.select`
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
`;


const BookingName = styled.p`
    font-weight: 600;
    margin: 0;
`


const SearchBar = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background-color: #f7f9fc;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
    flex-grow: 1;
    padding: 10px;
    border: none;
    border-radius: 4px;
    outline: none;
    margin-right: 10px;
`;

const AddPropertyButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #0074b7;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0388d5;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const TableHeader = styled.th`
    padding: 15px;
    background-color: #f3f4f6;
    font-size: 16px;
    color: #6b7280;
    text-align: left;
`;

const TableRow = styled.tr`
    &:hover {
        background-color: #f9fafb;
    }
`;

const TableCell = styled.td`
    padding: 15px;
    font-size: 16px;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
`;

const PropertyDetails = styled.div`
    display: flex;
    align-items: center;
`;

const PropertyImage = styled.img`
    width: 170px;
    height: 150px;
    border-radius: 6px;
    margin-right: 15px;
    object-fit: cover;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const ActionButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    margin: 0 5px;
    font-size: 16px;
    color: #6b5df0;

    &:hover {
        color: #5847d1;
    }
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const PaginationButton = styled.button`
    padding: 8px 16px;
    margin: 0 5px;
    border: none;
    border-radius: 4px;
    background-color: #0074b7;
    color: #fff;
    cursor: pointer;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;


const StatusText = styled.span`
    color: #0074B7;
    font-weight: bold;
    display: flex;
    align-items: center;
`;

const StatusDot = styled.span`
    width: 8px;
    height: 8px;
    background-color: #6B5DF0;
    border-radius: 50%;
    margin-right: 6px;
`;


const SortIcon = styled.span`
    margin-left: 8px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
`;


const BookingElement = styled.p`
    color: #666;
    margin: 4px 0;
`

const NomadBookingsPage = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.accessToken);
    const bookings = useSelector((state) => state.general.bookings);
    const properties = useSelector((state) => state.general.properties);
    const reviews = useSelector((state) => state.general.reviews || []);
    console.log('Bookings data:', bookings);
    console.log('properties data:', properties);
    console.log('revs data:', reviews);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    //const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [selectedPropertyId, setSelectedPropertyId] = useState("");
    const [selectedReview, setSelectedReview] = useState("");
    const [reviewLoading, setReviewLoading] = useState(false);


    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    // Fetch data in parallel by using Promise.all to avoid waiting for other fetches to complete!
                    const [bookingsResponse, propertiesResponse, reviewsResponse] = await Promise.all([
                        AxiosInstance.get("bookings/me/", {
                            headers: {Authorization: `Bearer ${token}`},
                        }),
                        AxiosInstance.get("property/", {
                            headers: {Authorization: `Bearer ${token}`},
                        }),
                        AxiosInstance.get("property/reviews/me/", {
                            headers: {Authorization: `Bearer ${token}`},
                        })
                    ]);

                    dispatch(setBookings(bookingsResponse.data));
                    dispatch(setProperties(propertiesResponse.data));
                    dispatch(setReviews(reviewsResponse.data));
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            })();
        }
    }, [token, dispatch]);


    const handleOpenReviewModal = (propertyId) => {
        console.log("Opening review modal for propertyId:", propertyId);
        setSelectedPropertyId(propertyId);
        setReviewLoading(true);

        // Filter reviews by propertyId and select the first matching review
        const selectedReview = reviews.find((review) => review.property === propertyId) || null;

        setSelectedReview(selectedReview);
        setReviewLoading(false);
        setIsModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setIsModalOpen(false);
        setSelectedPropertyId(null);
    };


    const handleReviewSubmit = (newOrUpdatedReview) => {
        dispatch(setReviews(
            reviews.map((review) =>
                review.id === newOrUpdatedReview.id ? newOrUpdatedReview : review
            ).concat(
                reviews.some((review) => review.id === newOrUpdatedReview.id) ? [] : [newOrUpdatedReview]
            )
        ));

        alert('Review submitted successfully!');
    };


    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // reset to page 1 when search term changes
    };

    // Sort and filter data
    const filteredData = bookings
        .filter((booking) => (statusFilter === "All" || booking.booking_status === statusFilter))
        .filter((booking) => booking.property.toLowerCase().includes(searchTerm.toLowerCase()));

    const sortedData = filteredData.sort((a, b) => {
        // Dynamically create the period using start_date and end_date
        const periodA = `${a.start_date} to ${a.end_date}`;
        const periodB = `${b.start_date} to ${b.end_date}`;

        const [startA] = periodA.split(" to ");
        const [startB] = periodB.split(" to ");
        const dateA = new Date(startA);
        const dateB = new Date(startB);

        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });


    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1); // reset to page 1 when filter changes
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
        setCurrentPage(1); // reset to page 1 when sorting order changes
    };

    // calculate rows to display on the curr page
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = sortedData.slice(startIndex, startIndex + rowsPerPage);


    return (
        <NomadDashboardLayout>
            <SearchBar>
                <SearchInput type="text" placeholder="Search by listing name..." value={searchTerm}
                             onChange={handleSearchChange}/>
            </SearchBar>


            <FilterContainer>
                <FilterLabel>Status:</FilterLabel>
                <FilterSelect value={statusFilter} onChange={handleStatusFilterChange}>
                    <option value="All">All</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                </FilterSelect>
            </FilterContainer>

            {/* review modal */}
            {isModalOpen && !reviewLoading && (
                <NomadReviewModal
                    propertyId={selectedPropertyId}
                    onClose={handleCloseReviewModal}
                    onReviewSubmit={handleReviewSubmit}
                    existingReview={selectedReview} // pass existing review data
                />
            )}

            {/* bookings table */}
            {(bookings.length || properties.length || reviews.length) && (
                <Table>
                    <thead>
                    <TableRow>
                        <TableHeader>Property</TableHeader>
                        <TableHeader>Status</TableHeader>
                        <TableHeader>Period
                            <SortIcon onClick={toggleSortOrder}>
                                {sortOrder === "asc" ? <FaSortUp/> : <FaSortDown/>}
                            </SortIcon>
                        </TableHeader>
                        <TableHeader>Price</TableHeader>
                        <TableHeader>Review</TableHeader>
                    </TableRow>
                    </thead>
                    <tbody>
                    {currentData.map((booking) => {
                        const property = properties.find((property) => property.id === booking.property);
                        const propertyName = property ? property.name : "Unknown Property";
                        const propertyImage = property && property.images.length > 0 ? property.images[0].content : "Unknown Image";

                        const startDate = new Date(booking.start_date);
                        const endDate = new Date(booking.end_date);

                        const bookingDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

                        const propertyPrice = property ? property.price : 0;
                        const totalPrice = propertyPrice * bookingDays;

                        const reviewForProperty = reviews.find((review) => review.property === booking.property);
                        const rating = reviewForProperty ? reviewForProperty.rating : 0; // default 0 if no review

                        return (
                            <React.Fragment key={booking.id}>
                                <TableRow>
                                    <TableCell>
                                        <PropertyDetails>
                                            <PropertyImage src={propertyImage} alt="Property"/>
                                            <div>
                                                <BookingName>
                                                    {propertyName}
                                                </BookingName>
                                                <BookingElement>{property.city}, {property.country}</BookingElement>
                                                {/*<BookingElement>Guests: {booking.guests}</BookingElement>*/}
                                            </div>
                                        </PropertyDetails>
                                    </TableCell>
                                    <TableCell>
                                        <StatusText>{booking.booking_status}</StatusText>
                                    </TableCell>
                                    <TableCell>{startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}</TableCell>
                                    <TableCell>{totalPrice.toFixed(2)} CHF</TableCell>
                                    <TableCell>
                                        {booking.booking_status === 'completed' && (<NomadStarRating
                                            rating={rating}
                                            onClick={() => handleOpenReviewModal(booking.property)}
                                        />)}
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        );
                    })}
                    </tbody>
                </Table>)}

            <PaginationContainer>
                <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </PaginationButton>
                <span>{currentPage} / {totalPages}</span>
                <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </PaginationButton>
            </PaginationContainer>

        </NomadDashboardLayout>
    );
};


export default NomadBookingsPage;