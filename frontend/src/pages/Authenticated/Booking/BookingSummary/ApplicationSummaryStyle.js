import styled from 'styled-components';
import {themes} from "../../../../styles/themes.js";

export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: ${themes.spaces.sm};

    input {
        margin-left: ${themes.spaces.xs};
    }
`;

export const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    text-align: center;
    padding: ${themes.spaces.xl};
    box-sizing: border-box;

    & > *:not(:last-child) {
        margin-bottom: ${themes.spaces.lg};
    }

    button {
        margin-top: ${themes.spaces.lg};
    }
`;

export const ErrorMessage = styled.div`
    color: ${themes.colors.red};
    margin-top: ${themes.spaces.sm};
    font-size: ${themes.fontSizes.sm};
    font-weight: ${themes.fontWeights.bd};
`;
