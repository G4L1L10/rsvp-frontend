import { createGlobalStyle } from "styled-components";
import WinkleFont from "../assets/fonts/Winkle-Regular.ttf"; // ✅ Import Winkle font

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Winkle';
    src: url(${WinkleFont}) format('truetype'); /* ✅ Use TrueType format */
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Winkle', sans-serif; /* ✅ Apply Winkle globally */
  }

  body {
    background-color: #f4f4f4;
    color: #333;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  input, button {
    font-size: 16px;
  }

  /* ✅ Mobile-friendly text sizes */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    body {
      font-size: 12px;
    }
  }
`;

export default GlobalStyles;
