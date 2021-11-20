import { createGlobalStyle } from 'styled-components'
import img from './assets/img/Background.svg'
import { Flex } from './components/StyledComponents/Flex'
import { AppRoutes } from './components/Pages/Navigation/AppRoutes'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-size: 45%;
    background-color: rgb(55, 56, 70);
    background-image: url(${img});
    color: aliceblue;
    font-family: Sans-Serif;
  }
`

function App() {
    return (
        <Flex>
            <GlobalStyle />
            <AppRoutes />
        </Flex>
    )
}

export default App
