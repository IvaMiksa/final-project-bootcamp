import {Link} from "react-router-dom";
import styled from "styled-components";

const StyledFooterContainer = styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.colors.whiteDark};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    gap: 1em;

    * {
        background-color: ${(props) => props.theme.colors.whiteDark};
    }
`;

const StyledLinksContainer = styled.div`
    display: flex;
    gap: 1rem;

    a {
        text-decoration: none;
        font-size: ${p => p.theme.fontSizes.xs};
        color: ${(props) => props.theme.colors.black};

        &:hover {
            color: ${(props) => props.theme.colors.blueLight};
            transition: background-color 0.3s ease-in;
        }
    }
`;

const StyledLinksSocialsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 20px;
    gap: 1em;


    &:hover {
        color: ${(props) => props.theme.colors.globalBlueHover};;
    }

`;


const Footer = () => {
    return (
        <StyledFooterContainer>
            <StyledLinksContainer>
                <Link to="#">PRIVACY POLICY</Link>
                <Link to="#">TERMS OF SERVICE</Link>
            </StyledLinksContainer>
            <StyledLinksSocialsContainer>
                <a href="http://facebook.com" target="_blank">
                    <img src="/svgs/facebook-blue.svg"/>
                </a>
                <a href="http://x.com" target="_blank">
                    <img src="/svgs/twitter-blue.svg"/>
                </a>
                <a href="http://instagram.com" target="_blank">
                    <img src="/svgs/instagram-blue.svg"/>
                </a>
            </StyledLinksSocialsContainer>
        </StyledFooterContainer>
    )
}

export default Footer