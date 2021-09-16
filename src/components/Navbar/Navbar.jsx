import React from 'react'
import Flex from '../StyledComponents/Flex'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Homepage from '../Homepage/Homepage'
import Reports from '../Reports/Reports'
import WeatherControlPage from '../WeatherControlPage/WeatherControlPage'
import Page404 from '../Page404/Page404'
import StyledNavLink from '../StyledComponents/StyledLink'
import ChartsPage from '../Charts/ChartsPage'
import Button from '../StyledComponents/Button'

export const stylesForStyledLink = {
    width: '90%',
    height: '3em',
    radius: '15px',
    text_align: 'center',
}

const Navbar = () => {
    const { path, url } = useRouteMatch()
    function clearLocalStorage() {
        localStorage.clear()
    }

    return (
        <Flex>
            <Flex
                height={' '}
                mHeight={'100vh'}
                width={'10%'}
                bColor={'rgb(37,37,38)'}
                padding={' 1em 1.1em'}
                rBorder={'2px solid white'}
                align={'center'}
                direction={'column'}
            >
                <StyledNavLink
                    exact
                    {...stylesForStyledLink}
                    to={'/Aide/'}
                    text={'Home 🏠'}
                />
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/Aide/charts'}
                    text={'Charts 📈'}
                />
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/Aide/reports'}
                    text={'Reports 📰'}
                />
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/Aide/weather'}
                    text={'Weather ⛈'}
                />
                <Button
                    title={'Delete saved data if app crashes'}
                    onClick={() => clearLocalStorage()}
                >
                    Clear app data
                </Button>
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
