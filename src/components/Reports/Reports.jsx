import React from 'react'
import SaturationByPeriodPage from './SaturationReport/SaturationByPeriodPage'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import StyledNavLink from '../StyledComponents/StyledLink'
import Flex from '../StyledComponents/Flex'
import { stylesForStyledLink } from '../Navbar/Navbar'
import SaturationByOnionsPage from './SaturationReport/SaturationByOnionsPage'
import SaturationBySelectedOnionPage from './SaturationReport/SaturationBySelectedOnionPage'

const Reports = () => {
    const { path, url } = useRouteMatch()

    return (
        <Flex>
            {/*<StyledNavLink*/}
            {/*    exact*/}
            {/*    to={`${url}`}*/}
            {/*    {...stylesForStyledLink}*/}
            {/*    text={'Period(Basic)'}*/}
            {/*/>*/}
            <StyledNavLink
                to={`${url}/period`}
                {...stylesForStyledLink}
                text={'Auto-report'}
            />
            <StyledNavLink
                to={`${url}/onion-select`}
                {...stylesForStyledLink}
                text={'Report by selected onions'}
                width={'300px'}
            />

            {/*<Route*/}
            {/*    exact*/}
            {/*    path={`${path}`}*/}
            {/*    component={SaturationByOnionsPage}*/}
            {/*/>*/}
            <Route
                exact
                path={`${path}/period`}
                component={SaturationByPeriodPage}
            />
            <Route
                path={`${path}/onion-select`}
                component={SaturationBySelectedOnionPage}
            />
            <Route exact path={path}>
                <Redirect to={`${path}/period`} />
            </Route>
        </Flex>
    )
}

export default Reports
