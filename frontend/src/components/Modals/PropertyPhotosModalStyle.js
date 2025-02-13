import styled from "styled-components";

export const StyledBackdrop = styled.div`
    position: fixed;
    height: 100%;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const StyledModal = styled.div`
    position: relative;
    width: 80%;
    max-width: 800px;
    z-index: 2;
    height: 100%;
    max-height: 500px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
`

export const CloseButton = styled.button`
    position: absolute;
    top: -20px;
    z-index: 2;
    font-size: 24px;
    right: -20px;
    color: white;
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        scale: 125%;
    }
`;

export const StyledImage = styled.img`
    width: 100%;
    height: 100%;
`;