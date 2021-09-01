import Analytics from './components/Analytics/Analytics.jsx'

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: black;
	  color: aliceblue;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

function App() {
	return (
		<div className="App">
			<GlobalStyle/>
			<Analytics />
		</div>
	)
}

export default App
