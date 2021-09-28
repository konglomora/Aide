import React from 'react'
import SaturationByPeriodPage from './SaturationReport/Pages/SaturationByPeriodPage'
import { Redirect, Route, useRouteMatch } from 'react-router-dom'
import StyledNavLink from '../StyledComponents/StyledLink'
import Flex from '../StyledComponents/Flex'
import SaturationBySelectedOnionPage from './SaturationReport/Pages/SaturationBySelectedOnionPage.jsx'
import WeatherActionPlan from './WeatherActionPlanReport/Pages/WeatherActionPlan'

const stylesForStyledLink = {
    width: '20%',
    height: '2em',
    radius: '15px',
    text_align: 'center',
}

const Reports = () => {
    const { path, url } = useRouteMatch()

    return (
        <Flex direction={'column'} width={'90%'}>
            <Flex
                justify={'space-evenly'}
                bBorder={'3px solid white'}
                padding={'20px 0px 10px'}
                bColor={'rgb(24,25,26)'}
            >
                <StyledNavLink
                    to={`${url}/period`}
                    {...stylesForStyledLink}
                    text={'Saturation report'}
                />
                <StyledNavLink
                    to={`${url}/onion-select`}
                    {...stylesForStyledLink}
                    text={'Onions saturation'}
                    width={'300px'}
                />
                <StyledNavLink
                    to={`${url}/action-plan`}
                    {...stylesForStyledLink}
                    text={'Action plan'}
                    width={'300px'}
                />
            </Flex>
            <Route
                exact
                path={`${path}/period`}
                component={SaturationByPeriodPage}
            />
            <Route
                path={`${path}/onion-select`}
                component={SaturationBySelectedOnionPage}
            />
            <Route path={`${path}/action-plan`} component={WeatherActionPlan} />
            <Route exact path={path}>
                <Redirect to={`${path}/period`} />
            </Route>
        </Flex>
    )
}

export default Reports
