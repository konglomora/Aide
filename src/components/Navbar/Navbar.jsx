import React from 'react'
import Flex from '../StyledComponents/Flex'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Homepage from '../Homepage/Homepage'
import Reports from '../Reports/Reports'
import WeatherControlPage from '../WeatherControlPage/WeatherControlPage'
import Page404 from '../Page404/Page404'
import StyledNavLink from '../StyledComponents/StyledLink'
import ChartsPage from '../Reports/Charts/ChartsPage'

export const stylesForStyledLink = {
    width: '10%',
    padding: '9px',
    radius: '15px',
    background_color: 'rgb(93,68,165)',
    border: '3px solid white',
    text_align: 'center',
}

const Navbar = () => {
    const { path, url } = useRouteMatch()

    return (
        <Flex direction={'column'}>
            <Flex
                height={'30%'}
                bColor={'rgb(61,45,108)'}
                padding={'7px 0px'}
                justify={'space-evenly'}
                bBorder={'3px dashed white'}
            >
                <StyledNavLink
                    exact
                    {...stylesForStyledLink}
                    to={'/Aide/'}
                    text={'Home'}
                />
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/Aide/charts'}
                    text={'Charts'}
                />
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/Aide/reports'}
                    text={'Reports'}
                />
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/Aide/weather'}
                    text={'Weather'}
                />
            </Flex>

            <Switch>
                <Route exact path={'/Aide/'} component={Homepage} />
                <Route path={'/Aide/charts'} component={ChartsPage} />
                <Route path={'/Aide/reports'} component={Reports} />
                <Route path={'/Aide/weather'} component={WeatherControlPage} />
                <Route path="*" component={Page404} />
            </Switch>
        </Flex>
    )
}

export default Navbar
