import { createGlobalStyle } from 'styled-components'
import Navbar from './components/Navbar/Navbar'
import img from './assets/img/Background.svg'

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
        <>
            <GlobalStyle />
            <Navbar />
        </>
    )
}

export default App
