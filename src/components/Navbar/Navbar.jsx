import React from 'react';
import Flex from "../StyledComponents/Flex";
import {Route, Switch} from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import Reports from "../Reports/Reports";
import WeatherControlPage from "../WeatherControlPage/WeatherControlPage";
import Page404 from "../Page404/Page404";
import StyledNavLink from "../StyledComponents/StyledLink";
import ChartsPage from "../Reports/Charts/ChartsPage";

const stylesForStyledLink = {
    width: '10%',
    padding: '9px',
    radius: '15px',
    bColor: 'rgb(93,68,165)',
    border: '3px solid white',
    textAlign: 'center',
}

const Navbar = () => {
    return (
        <Flex direction={'column'}>
            <Flex height={'30%'} bColor={'rgb(61,45,108)'} padding={'7px'} justify={'space-evenly'}
                  bBorder={'3px dashed white'}>
                <StyledNavLink exact {...stylesForStyledLink} link={'/Aide/'} name={'Home'}/>
                <StyledNavLink exact {...stylesForStyledLink} link={'/Aide/charts'} name={'Charts'}/>
                <StyledNavLink exact {...stylesForStyledLink} link={'/Aide/reports'} name={'Reports'}/>
                <StyledNavLink exact {...stylesForStyledLink} link={'/Aide/weather'} name={'Weather'}/>
            </Flex>

            <Switch>
                <Route exact path={'/Aide/'} component={Homepage}/>
                <Route exact path={'/Aide/charts'} component={ChartsPage}/>
                <Route exact path={'/Aide/reports'} component={Reports}/>
                <Route exact path={'/Aide/weather'} component={WeatherControlPage}/>
                <Route path='*' component={Page404}/>
            </Switch>
        </Flex>
    );
};

export default Navbar;