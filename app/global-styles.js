import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Poppins',  Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Poppins',  sans-serif;
  }

  #app {
    background-color: #f9f9f9;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
 
`;

export default GlobalStyle;
