import styled from "styled-components";
import StarRating from "../StarRating/StarRating.jsx";
import ReviewCard from "../ReviewCard/ReviewCard.jsx";

const StyledBackdrop = styled.div`
    position: fixed;
    height: 100%;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledModal = styled.div`
    position: relative;
    width: 60%;
    max-width: 800px;
    z-index: 2;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 500px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    padding: 0 2rem 0 1rem;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    z-index: 2;
    font-size: 24px;
    right: 10px;
    color: #000;
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        scale: 125%;
    }
`;

const StyledAllReviewsHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 1rem 0.4rem 1rem;
`

const StyledAllReviewRating = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    text-align: center;
`
const AllReviewsModal = ({setShowMoreModal, reviews}) => {
    const averageRating =
        reviews?.length > 0
            ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
            : 0;

    return (
        <StyledBackdrop>
            <StyledModal>
                <StyledAllReviewsHeader>
                    <h2>{reviews.length} Reviews</h2> {/* Display total review count */}
                    <StyledAllReviewRating>
                        <h2>{averageRating.toFixed(1)}</h2> {/* Display average rating */}
                        <StarRating rating={averageRating}/>
                    </StyledAllReviewRating>
                </StyledAllReviewsHeader>
                {reviews.map((review, idx) => (
                    <ReviewCard
                        key={idx}
                        firstname={review.created_by?.first_name}
                        lastname={review.created_by?.last_name}
                        country={review.created_by?.country}
                        rating={review.rating}
                        content={review.content}
                        avatar={review.created_by?.avatar || '/nomad_photos/user.png'}
                        width="100%"
                    />
                ))}
                <CloseButton onClick={() => setShowMoreModal(false)}>X</CloseButton>
            </StyledModal>
        </StyledBackdrop>
    );
};

export default AllReviewsModal
