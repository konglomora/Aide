import { createGlobalStyle, DefaultTheme } from 'styled-components'

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  body {
    margin: 0;
    padding: 0;
    background-size: 22%;
    background-color: ${({ theme }) => theme.mainBackgroundColor}; 
    background-image: url(${({ theme }) => theme.mainBackgroundImage});
    font-family: Sans-Serif;
  }
`
export { GlobalStyle }
