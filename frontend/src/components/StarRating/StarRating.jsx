import styled from "styled-components";

const StyledStarContainer = styled.div`
    font-size: 24px;
    display: flex;
`;

const Star = styled.div`
    color: ${p => p.theme.colors.grayLight};
    position: relative;

    &::before {
        content: '★';
        position: absolute;
        left: 0;
        width: ${props => props.$decimalWidth ? props.$decimalWidth : '100%'};
        overflow: hidden;
        color: ${props => props.$filled || props.$decimalWidth ? "#FDC921" : '#EBEBEB80'};
    }
`;

const StarRating = ({rating}) => {
    // TODO: handle on the backend to return 0 not null
    if (!rating) {
        rating = 0
    }

    const fullStars = Math.floor(rating);
    const decimalStarRating = rating % 1;
    const emptyStars = 5 - fullStars - (decimalStarRating > 0 ? 1 : 0)

    return (
        <StyledStarContainer>
            {[...Array(fullStars)].map((_, idx) => (
                <Star key={`full-${idx}`} $filled>
                    ★
                </Star>
            ))}
            {decimalStarRating > 0 && (
                <Star key="half" $decimalWidth={`${decimalStarRating * 100}%`}>
                    ★
                </Star>
            )}
            {[...Array(emptyStars)].map((_, idx) => (
                <Star key={`empty-${idx}`}>
                    ★
                </Star>
            ))}
        </StyledStarContainer>
    )
}

export default StarRating
