import styled from "styled-components";
import {Link} from "react-router-dom";


export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


export const StyledContainerRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 0;
    gap: 1em;
    padding-top: 2em;

`;

export const StyledHeaderRow = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center;
    flex-wrap: wrap;
    margin: 0;
    gap: 1em;
    padding: 1.5em;
    width: 100%; 
`;


export const StyledLink = styled(Link)`
    text-decoration: none;
`