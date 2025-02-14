import styled from 'styled-components';
import {themes} from "../../../../styles/themes.js";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    padding: ${themes.spaces.base};

    & > *:not(:last-child) {
        margin-bottom: ${themes.spaces.lg};
    }

`;



