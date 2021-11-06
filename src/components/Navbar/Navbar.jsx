import React from 'react'
import Flex from '../StyledComponents/Flex'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Reports from '../Reports/Reports'
import Page404 from '../Page404/Page404'
import StyledNavLink from '../StyledComponents/StyledLink'

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
                    to={'/Aide/weather'}
                    text={'Weather ⛈'}
                />
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/Aide/reports'}
                    text={'Reports 📰'}
                />
            </Flex>
            <Switch>
                <Route path={'/Aide/reports'} component={Reports} />
            </Switch>
        </Flex>
    )
}

export default Navbar
