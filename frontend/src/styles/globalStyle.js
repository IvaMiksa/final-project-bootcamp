import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    // Here define styling that is supposed to be valid everywhere
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Roboto", sans-serif;
        color: ${p => p.theme.colors.black};
    }
    
    body {
      background-color: ${p => p.theme.colors.whiteDark};
    }
`;

