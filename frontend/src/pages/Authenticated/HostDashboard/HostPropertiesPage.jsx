import HostDashboardLayout from "../../Layouts/HostDashboardLayout/HostDashboardLayout.jsx";
import {setProperties} from "../../../store/slices/generalSlice.js";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {FaCalendarAlt, FaEdit, FaSortDown, FaSortUp, FaTrash} from "react-icons/fa";
import styled from "styled-components";
import {AxiosInstance} from "../../../utils/axios.js";
import {toast} from "react-toastify";


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
    font-size: 14px;
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
    color: #6B5DF0;
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

const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
`;

const FilterLabel = styled.label`
    font-size: 14px;
    font-weight: bold;
    color: #666;
    margin-left: 10px;
`;

const FilterSelect = styled.select`
    padding: 8px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ddd;
`;


const HostPropertiesPage = () => {
    const dispatch = useDispatch();
    const properties = useSelector((state) => state.general.properties);
    const token = useSelector((state) => state.user.accessToken);


    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const [searchTerm, setSearchTerm] = useState("");
    const [occupancyStatus, setOccupancyStatus] = useState({});
    const [selectedOccupancy, setSelectedOccupancy] = useState("All");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedVerification, setSelectedVerification] = useState("All");

    useEffect(() => {
        // Fetch properties when component mounts
        const fetchProperties = async () => {
            try {
                const response = await AxiosInstance.get("property/me/", {
                    headers: {"Authorization": `Bearer ${token}`},
                });
                dispatch(setProperties(response.data));
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, [dispatch, token]);

    useEffect(() => {
        // Fetch bookings after properties are fetched
        const fetchBookings = async () => {
            try {
                const response = await AxiosInstance.get("bookings/", {
                    headers: {"Authorization": `Bearer ${token}`},
                });
                const bookings = response.data;
                const today = new Date();

                // Calculate occupancy for each property based on bookings
                const occupancy = {};
                properties.forEach((property) => {
                    const isOccupied = bookings.some((booking) => {
                        if (booking.property === property.id) {
                            const startDate = new Date(booking.start_date);
                            const endDate = new Date(booking.end_date);
                            return today >= startDate && today <= endDate;
                        }
                        return false;
                    });
                    occupancy[property.id] = isOccupied ? "occupied" : "available";
                });

                setOccupancyStatus(occupancy);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        // Only fetch bookings if properties have been loaded
        if (properties.length > 0) {
            fetchBookings();
        }
    }, [properties, token]);


    const navigate = useNavigate();

    const handleAddProperty = () => {
        navigate('/host-add-new-property');
    };

    const handleOccupancyRedirect = () => {
        navigate('/host-bookings');
    };

    const handleOccupancyFilterChange = (event) => {
        setSelectedOccupancy(event.target.value);
    };

    // Toggle sorting order
    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    const handleVerificationFilterChange = (event) => {
        setSelectedVerification(event.target.value);
    };


    // Filter and sort properties
    const filteredProperties = properties
        .filter((property) => {
            const matchesSearch = property.name && property.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesOccupancy = selectedOccupancy === "All" || occupancyStatus[property.id] === selectedOccupancy;
            const matchesVerification =
                selectedVerification === "All" ||
                (selectedVerification === "pending" && property.verification === "pending") ||
                (selectedVerification === "accepted" && property.verification === "accepted") ||
                (selectedVerification === "rejected" && property.verification === "rejected");

            return matchesSearch && matchesOccupancy && matchesVerification;
        })
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });

    // Pagination
    const totalPages = Math.ceil(filteredProperties.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = filteredProperties.slice(startIndex, startIndex + rowsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleEdit = (propertyId) => {
        console.log(`Edit property with ID: ${propertyId}`);
        navigate(`/host-edit-property/${propertyId}`);
    };

    // Delete property
    const handleDelete = async (propertyId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this property?");
        if (confirmDelete) {
            try {
                const response = await AxiosInstance.delete(`property/${propertyId}/`);

                if (response.status === 204) {
                    toast.success("Property deleted successfully.")
                    // Remove the deleted property immediately (or refetch properties to sync with backend data)
                    dispatch(setProperties(properties.filter((property) => property.id !== propertyId)));
                } else {
                    toast.error("Failed to delete the property. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting property:", error);
                toast.error("An error occurred while deleting the property.");
            }
        }
    };


    return (
        <HostDashboardLayout>
            <SearchBar>
                <SearchInput type="text" placeholder="Search by property name..." value={searchTerm}
                             onChange={(e) => setSearchTerm(e.target.value)}/>
                <AddPropertyButton onClick={handleAddProperty}>+ Add New Property</AddPropertyButton>
            </SearchBar>

            {/*<FilterContainer>
          <FilterLabel>Status:</FilterLabel>
          <FilterSelect value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="All">All</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </FilterSelect>
            <AddPropertyButton onClick={handleAddProperty}>+ Add new property</AddPropertyButton>
        </FilterContainer>*/}


            <FilterContainer>
                {/* Verification Filter */}
                <FilterLabel>Verification:</FilterLabel>
                <FilterSelect value={selectedVerification} onChange={handleVerificationFilterChange}>
                    <option value="All">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </FilterSelect>
                {/* Occupancy Filter */}
                <FilterLabel>Occupancy:</FilterLabel>
                <FilterSelect value={selectedOccupancy} onChange={handleOccupancyFilterChange}>
                    <option value="All">All</option>
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                </FilterSelect>
            </FilterContainer>


            {/* properties table */}
            <Table>
                <thead>
                <TableRow>
                    <TableHeader>Property</TableHeader>
                    {/*<TableHeader>Status</TableHeader>
              <TableHeader>Period
                  <SortIcon onClick={toggleSortOrder}>
                  {sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
                </SortIcon>
              </TableHeader>*/}
                    <TableHeader>Verification</TableHeader>
                    <TableHeader onClick={handleOccupancyRedirect}>
                        Occupancy <FaCalendarAlt/>
                    </TableHeader>
                    <TableHeader onClick={toggleSortOrder}>
                        Price per day {sortOrder === "asc" ? <FaSortUp/> : <FaSortDown/>}
                    </TableHeader>
                    <TableHeader>Actions</TableHeader>
                </TableRow>
                </thead>
                <tbody>
                {currentData.map((property) => (
                    <React.Fragment key={property.id}>
                        <TableRow>
                            <TableCell>
                                <PropertyDetails>
                                    <PropertyImage src={property.images[0]?.content || "placeholder.jpg"}
                                                   alt="Property"/>
                                    <div>
                                        {/*<BookingName>*/}
                                        {property.name}
                                        {/*</BookingName>*/}
                                        <BookingElement>{property.city}, {property.country}</BookingElement>
                                        {/*<BookingElement>Guests: {booking.guests}</BookingElement>*/}
                                    </div>
                                </PropertyDetails>

                            </TableCell>
                            {/*<TableCell>
                      <StatusText><StatusDot /> {booking.status}</StatusText>
                  </TableCell>*/}
                            {/*<TableCell>{booking.period}</TableCell>*/}
                            <TableCell>{property.verification}</TableCell>
                            <TableCell>{occupancyStatus[property.id] || "available"}</TableCell>
                            <TableCell>{property.price} CHF</TableCell>
                            <TableCell>
                                <FaEdit style={{cursor: 'pointer', marginRight: '10px'}}
                                        onClick={() => handleEdit(property.id)}/>
                                <FaTrash style={{cursor: 'pointer'}} onClick={() => handleDelete(property.id)}/>
                            </TableCell>
                        </TableRow>
                    </React.Fragment>
                ))}
                </tbody>
            </Table>

            <PaginationContainer>
                <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </PaginationButton>
                <span>{currentPage} / {totalPages}</span>
                <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </PaginationButton>
            </PaginationContainer>


        </HostDashboardLayout>


    );
};

export default HostPropertiesPage;
