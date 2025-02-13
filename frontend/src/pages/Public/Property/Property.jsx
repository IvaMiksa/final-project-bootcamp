import {useEffect, useMemo, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {
    StyledAmenitiesSection,
    StyledAmenity,
    StyledAmenityIcon,
    StyledContentContainer,
    StyledMainAmenities,
    StyledMainContent,
    StyledPropertyImages,
    StyledPropertyReviews,
    StyledPropertyImage,
    StyledPriceCalculatorContainer,
    StyledContent,
    StyledPropertyImagesContainer,
    StyledReviewList, StyledTitleContainer, StyledBackContainer, StyledBadge,
    StyledBadgeContainer, StyledPropertySize, Heading2, Heading3, DescriptionHeading,
    StyledIcon, DescriptionContainer, DescriptionText
} from "./PropertyStyle.js";

import ReviewCard from "../../../components/ReviewCard/ReviewCard.jsx";
import Button from "../../../components/Button/Button.jsx";
import AllReviewsModal from "../../../components/Modals/AllReviewsModal.jsx";
import {AxiosInstance} from "../../../utils/axios.js";
import PriceCalculator from "../../../components/PriceCalculator/PriceCalculator.jsx";
import PropertyPhotosModal from "../../../components/Modals/PropertyPhotosModal.jsx";
import {isAfter, isBefore, parse} from 'date-fns';

const Property = () => {
    const [searchParams] = useSearchParams();

    // Parse initial search parameters on mount
    const {initialFrom, initialTo} = useMemo(() => {
        let from = null;
        let to = null;

        try {
            // Parse DD-MM-YYYY formatted dates using date-fns
            if (searchParams.get('from')) from = parse(searchParams.get('from'), 'dd-MM-yyyy', new Date());
            if (searchParams.get('to')) to = parse(searchParams.get('to'), 'dd-MM-yyyy', new Date());
        } catch (error) {
            console.info('Failed to parse search parameters:', error);
        }

        return {
            initialFrom: from,
            initialTo: to,
        };
    }, [searchParams]);

    const {id} = useParams();

    const [property, setProperty] = useState([]);
    const [showMoreModal, setShowMoreModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isAvailable, setIsAvailable] = useState(true);

    useEffect(() => {
        AxiosInstance.get(`/property/${id}/`)
            .then(res => {
                setProperty(res.data);
                console.log(res.data);

                // Check availability based on bookings
                const isStillAvailable = res.data.bookings?.every(booking =>
                    isAfter(initialFrom, new Date(booking.end_date)) ||
                    isBefore(initialTo, new Date(booking.start_date))
                );

                setIsAvailable(isStillAvailable);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <>
        <StyledContentContainer>
            <StyledTitleContainer>

                <div>
                    <div>
                        <Heading2>{property?.name}</Heading2>
                        <Heading3>{property?.street} {property?.apartment_block_number}</Heading3>
                    </div>

                    <StyledBadgeContainer>
                        <StyledBadge src="/svgs/verified.svg"/>
                        <h5>Verified Property</h5>

                    </StyledBadgeContainer>

                             <StyledPropertySize>
                                 <StyledIcon src="/svgs/tape_icon.svg" alt="Size Icon"/>
                                    <strong>{property?.size ? property.size : "N/A"}</strong>
                                    <strong> m<sup>2</sup></strong>
                             </StyledPropertySize>

                </div>


                <StyledBackContainer>
                    <Button onClick={handleBackClick} label="Back to results"/>
                </StyledBackContainer>
            </StyledTitleContainer>


            <StyledMainContent>
            <StyledContent>


                <DescriptionContainer>
                    <DescriptionHeading>Description</DescriptionHeading>
                    <DescriptionText>{property.description}</DescriptionText>
                </DescriptionContainer>






                        <StyledAmenitiesSection>
                            <StyledMainAmenities>
                                {property?.amenities?.map((amenity) => (
                                    <StyledAmenity key={amenity.id}>
                                        <StyledAmenityIcon src={amenity?.icon} alt={amenity.name}/>
                                        <span>{amenity.name}</span>
                                    </StyledAmenity>
                                ))}
                            </StyledMainAmenities>
                        </StyledAmenitiesSection>

                        <StyledPriceCalculatorContainer>

                            {isAvailable ? (
                                <PriceCalculator
                                    propertyname={property?.name}
                                    amount={property?.price}
                                    startdate={initialFrom}
                                    enddate={initialTo}
                                    propertyId={property?.id}
                                    propertyBookings={property?.bookings}
                                />
                            ) : (
                                <p>This property is not available for the selected dates.</p>
                            )}

                        </StyledPriceCalculatorContainer>

                    </StyledContent>

                    <StyledPropertyImagesContainer>
                        <StyledPropertyImages>
                            {property?.images?.map((image, idx) => (
                                <StyledPropertyImage src={image.content} key={image.id}
                                                     onClick={() => setSelectedIndex(idx)}/>
                            ))}
                        </StyledPropertyImages>
                        {selectedIndex !== null &&
                            <PropertyPhotosModal setSelectedIndex={setSelectedIndex} images={property?.images}
                                                 selectedIndex={selectedIndex}/>
                        }

                    </StyledPropertyImagesContainer>
                </StyledMainContent>

                <StyledPropertyReviews>
                    <h2>Reviews</h2>
                    {property?.reviews?.length > 0 ? (
                        <>
                            <StyledReviewList>
                                {property.reviews.slice(0, 3).map((review, idx) => (
                                    <ReviewCard
                                        key={idx}
                                        firstname={review.created_by?.first_name}
                                        lastname={review.created_by?.last_name}
                                        country={review.created_by?.country}
                                        rating={review.rating}
                                        content={review.content}
                                        avatar={review.created_by?.avatar || '/nomad_photos/user.png'}
                                    />
                                ))}
                            </StyledReviewList>
                            {property?.reviews?.length > 3 && (
                                <Button label="Show more" style={{marginTop: "1rem"}}
                                        onClick={() => setShowMoreModal(true)}/>
                            )}
                        </>
                    ) : (
                        <p>No reviews available for this property.</p>
                    )}
                    {showMoreModal && (
                        <AllReviewsModal
                            setShowMoreModal={setShowMoreModal}
                            reviews={property?.reviews}
                        />
                    )}
                </StyledPropertyReviews>
            </StyledContentContainer>
        </>
    );
};

export default Property;
