import SaturationReportPage from './components/Reports/SaturationReport/SaturationReportPage.jsx'

import {createGlobalStyle} from 'styled-components';
import Navbar from "./components/Navbar/Navbar";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: rgb(61, 45, 108);
    color: aliceblue;
    font-family: Sans-Serif;
  }
`;

function App() {
    return (
        <>
            <GlobalStyle/>
            <Navbar/>
        </>
    )
}

export default App
