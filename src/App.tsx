import { createGlobalStyle } from 'styled-components'
import Navbar from './components/Pages/Navigation/MainNavbar'
import img from './assets/img/Background.svg'
import { Route, Switch } from 'react-router-dom'
import LoginPage from './components/Pages/Authorization/LoginPage'
import RegisterPage from './components/Pages/Authorization/RegisterPage'
import React from 'react'
import Homepage from './components/Pages/Homepage/Homepage'

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
            <Switch>
                <Route exact path={'/Aide/'} component={Homepage} />
                {/* <Route path={'/Aide/login'} component={LoginPage} />
                <Route path={'/Aide/register'} component={RegisterPage} /> */}
                {/* <Route path="*" component={Page404} /> */}
            </Switch>
            <Navbar />
        </>
    )
}

export default App
