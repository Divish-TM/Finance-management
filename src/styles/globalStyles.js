import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme.background.default};
    color: ${({ theme }) => theme.text.primary};
  }
`;

export default GlobalStyles;
