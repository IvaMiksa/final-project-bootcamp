import styled from "styled-components";
import {Link} from "react-router-dom";

export const StyledBadgeContainer = styled.div`
    display: flex;
    align-items: center;
    padding-top: 1rem;
`
export const StyledBadge = styled.img`
    height: 25px;
    width: 25px;
    
    h5 {
        background-color: ${p => p.theme.colors.green};
    }
`
export const StyledTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 1rem;
`
export const StyledBackContainer = styled.div`
    display: flex;
    flex-direction: column;
`
export const Heading2 = styled.h2`
    font-size: ${({ theme }) => theme.fontSizes.xl5}; 
    font-weight: ${({ theme }) => theme.fontWeights.bd};
`;

export const Heading3 = styled.h3`
    font-size: ${({ theme }) => theme.fontSizes.xl2}; 
    font-weight: ${({ theme }) => theme.fontWeights.md};
    color: ${({ theme }) => theme.colors.gray};
`;

export const DescriptionContainer = styled.div`
  width: 100%;
  
`;

export const DescriptionHeading = styled.h2`
    font-size: ${({ theme }) => theme.fontSizes.xl2}; 
  margin-bottom: 0.5rem;
     margin-top: 0;
    padding: 0;
`;

export const DescriptionText = styled.p`
  text-align: justify;
  line-height: 1.5;
  margin: 0;
`;

export const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 50%;
    padding-right: 2rem;
`
export const StyledPriceCalculatorContainer = styled.div`
    padding: 2rem 0;

    h2 {
        padding-bottom: 1rem;
    }
`

export const StyledPropertyImagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 1rem;
    margin-top: .25rem;
`


export const StyledContentContainer = styled.div`
    padding: 2rem;
`

export const StyledMainContent = styled.section`
    display: flex;
    justify-content: space-between;
    //margin-top: 2rem;
`


export const StyledPropertyImages = styled.section`
    display: grid;
    gap: 0.4rem;
    grid-template-columns: repeat(2, 2fr);
`

export const StyledPropertyImage = styled.img`
    width: 100%;
    height: 250px;
    border-radius: ${p => p.theme.borderRadius.xl2};

    &:hover {
        cursor: pointer;
    }
`

export const StyledPropertyActionButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
`

export const StyledPropertyButton = styled(Link)`
    background-color: ${props => props.theme.colors.globalBlue};
    width: 150px;
    text-align: center;
    padding: 10px 20px;
    border-radius: 20px;
    text-decoration: none;
    color: #fff;

    &:hover {
        opacity: 90%;
    }
`

export const StyledAmenitiesSection = styled.section`
    padding: 2rem 0;
`

export const StyledMainAmenities = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    max-height: 650px;
    width: 100%;


    & > * {
        flex: 1 1 45%;
        min-width: 200px;
    }
`;


export const StyledAdditionalAmenities = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
`


export const StyledAmenity = styled.p`
    display: flex;
    align-items: center;
    gap: 1rem;
    text-transform: uppercase;
    font-weight: bold;
`

export const StyledAmenityIcon = styled.img`
    width: 30px;
    height: 30px;
`



export const StyledAdditionalAmenitiesHeader = styled.h4`
    text-transform: uppercase;
`
export const StyledAdditionalAmenitiesList = styled.ul`
    margin-top: 1rem;
`

export const StyledAdditionalAmenity = styled.p`
    text-transform: uppercase;
`

export const StyledReviewContainer = styled.section`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
`

export const StyledReviewList = styled.ul`
    display: flex;
    gap: 1rem;
`

export const StyledPropertyReviews = styled.section`
    padding: 2rem 0 2rem 0;
`
export const StyledPropertySize = styled.div`
    display: flex;
    align-items: center;  
    gap: 0.5rem;
    padding-top: .25rem;  

    strong {
        font-weight: bold;
        display: inline-block;
        line-height: 1;
        font-size: 1.5rem;  
    }

    sup {
        font-size: 0.75rem;  
        vertical-align: super;
        margin-top: -0.3rem;  
    }
`
export const StyledIcon = styled.img`
    width: 30px;
    height: 30px;
`

;



