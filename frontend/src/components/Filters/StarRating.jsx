import React, {useState} from "react";
import styled from "styled-components";

// Star styled components
const StarContainer = styled.div`
    display: flex;
    cursor: pointer;
`;

const Star = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 0.2rem;
    background-color: ${(p) =>
    p.filled ? p.theme.colors.yellow : p.theme.colors.gray};
    clip-path: polygon(
        50% 0%,
        61% 35%,
        98% 35%,
        68% 57%,
        79% 91%,
        50% 70%,
        21% 91%,
        32% 57%,
        2% 35%,
        39% 35%
    );
    transition: background-color 0.2s;
`;

const RatingText = styled.div`
    margin-top: 10px;  /* Adjusted for about 20px spacing */
`;

const StarRating = ({minRating = 0, onRatingChange}) => {
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(minRating);

    const handleStarClick = (rating) => {
        setSelectedRating(rating);
        onRatingChange(rating);  // Pass selected rating to parent
    };

    const handleStarHover = (rating) => {
        setHoveredRating(rating);
    };

    const handleStarLeave = () => {
        setHoveredRating(0);
    };

    return (
        <div>
            <StarContainer onMouseLeave={handleStarLeave}>
                {[1, 2, 3, 4, 5].map((rating) => (
                    <Star
                        key={rating}
                        filled={rating <= (hoveredRating || selectedRating)}
                        onClick={() => handleStarClick(rating)}
                        onMouseEnter={() => handleStarHover(rating)}
                    />
                ))}
            </StarContainer>
            <RatingText>
                Minimum Rating: {selectedRating} {selectedRating > 1 ? "stars" : "star"}
            </RatingText>
        </div>
    );
};

export default StarRating;
