import styled from "styled-components";
import StarRating from "../StarRating/StarRating.jsx";

const StyledReviewCardContainer = styled.div`
    margin-top: 1rem;
    width: ${props => props.$width ? props.$width : "35%"};
    padding: 1rem;
    border: ${p => p.theme.border.light};
    border-radius: ${p => p.theme.borderRadius.xl2};
    box-shadow: ${p => p.theme.boxShadow.dark};

`

const StyledUserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

const StyledUserNameCountry = styled.div`
`

const StyledUserPhoto = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`

const StyledUserCountry = styled.span`
    color: gray;
    font-size: 14px;
`

const StyledStarCreatedAt = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

const ReviewCard = ({width, firstname, lastname, country, rating, created_at, content, avatar}) => {

    return (
        <StyledReviewCardContainer $width={width}>
            <StyledUserInfo>
                <StyledUserPhoto alt='user photo' src={avatar}/>
                <StyledUserNameCountry>
                    <h4>{firstname} {lastname}</h4>
                    <StyledUserCountry>{country}</StyledUserCountry>
                </StyledUserNameCountry>
            </StyledUserInfo>
            <StyledStarCreatedAt>
                <StarRating rating={rating}/>
                <span>{created_at}</span>
            </StyledStarCreatedAt>
            <p>{content}</p>
        </StyledReviewCardContainer>
    )
}

export default ReviewCard