import styled, {keyframes} from "styled-components";

const spinAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const StyledSpinnerContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledSpinner = styled.div`
    border: 3px solid #b0d1e6;
    border-bottom: 3px solid #216a9b;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: ${spinAnimation} 0.5s linear infinite;
`;

export default function Spinner() {
    return (
        <StyledSpinnerContainer>
            <StyledSpinner/>
        </StyledSpinnerContainer>
    );
}
