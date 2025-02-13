import styled from 'styled-components';

export const Container = styled.section`
    display: flex;
    position: relative;
`;

export const ContentContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 4rem 2rem 4rem 2rem;
    gap: 1.2rem;
    justify-content: flex-end;
    position: relative;
    max-width: 1280px;
    width: 100%;
    margin: auto;
`;


export const StyledTextContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    padding: 1rem;
`;

export const StyledVideoSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 2rem;
    gap: 1rem;
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.71);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.3px);
    -webkit-backdrop-filter: blur(7.3px);
    border: 1px solid rgba(255, 255, 255, 0.08);
`;


export const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;

    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.71);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.3px);
    -webkit-backdrop-filter: blur(7.3px);
    border: 1px solid rgba(255, 255, 255, 0.08);
`;


export const CallToActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1rem;
`;


export const DayPickerWrapper = styled.div`

`;


export const DayPickerContainer = styled.div`
    margin-top: 30px;
    margin-bottom: 30px;
`;

export const PhotoContainer = styled.div`
    height: 100%;
    overflow: hidden; /* Ensure slides fit within the container */
    position: absolute;
    inset: 0;
    z-index: -1;
    object-fit: cover;
`;

export const IconContainer = styled.section`
    display: flex;
    gap: 1.2em;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1280px;
    margin: auto;
    padding: 3rem;

`;
export const StyledInfoSection = styled.section`
    display: flex;
    padding: 2rem;
    justify-content: space-between;
    max-width: 1280px;
    margin: auto;
`;

export const StyledParagraph = styled.p`
    white-space: pre-line;
`;

export const CommentContainer = styled.div`
    text-align: right;
    margin-right: 100px;
`;

export const Comment = styled.span`
    display: block;
    font-size: ${({theme}) => theme.fontSizes.xs};
    margin-bottom: 100px;
`;
export const SwiperContainer = styled.div`
    margin-bottom: 100px;
    width: 100%;
`;

export const PropertyInfosContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-block: 1px solid gray;
    padding-block: 1.4rem;
    //width: 80%;
`

export const PropertyInfo = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`

export const PropertyDescription = styled.div`
    display: flex;
    padding-top: 1rem;
    //border-top: 1px solid gray;
    flex-direction: column;
    gap: 0.4rem;

`


export const StorySection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    margin: 0;
    width: 100%;
`;


export const StoryContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    position: relative;
`;


export const StoryImage = styled.img`
    width: 100%;
    position: relative;
    border-radius: 0;
    padding: 0;
    display: block;
`;


export const StoryTextContainer = styled.div`
    position: absolute;
    top: 15%;
    left: 60%;
    height: auto;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    background-color: rgba(255, 255, 255, 0.5);
`;


export const TeamSection = styled.section`
    padding: ${p => p.theme.spaces.xl7} 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


export const TeamContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;
