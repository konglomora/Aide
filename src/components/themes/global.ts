import { createGlobalStyle, DefaultTheme } from 'styled-components'

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  body {
    margin: 0;
    padding: 0;
    background-size: 20em;
    background-color: ${({ theme }) => theme.mainBackgroundColor}; 
    background-image: url(${({ theme }) => theme.mainBackgroundImage});
    font-family: Sans-Serif;
  }
`
export { GlobalStyle }
