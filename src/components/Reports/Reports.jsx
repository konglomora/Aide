import React from 'react'
import SaturationByPeriodPage from './SaturationReport/SaturationByperiodPage/SaturationByPeriodPage'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import StyledNavLink from '../StyledComponents/StyledLink'
import Flex from '../StyledComponents/Flex'
import { stylesForStyledLink } from '../Navbar/Navbar'
import SaturationByOnionsPage from './SaturationReport/SaturationByOnionsPage/SaturationByOnionsPage'

const Reports = () => {
    const { path, url } = useRouteMatch()

    console.log({ path })
    console.log({ url })
    return (
        <Flex>
            <StyledNavLink
                exact
                to={`${url}`}
                {...stylesForStyledLink}
                text={'Onions'}
            />
            <StyledNavLink
                to={`${url}/period`}
                {...stylesForStyledLink}
                text={'Period'}
            />

            <Route exact path={`${path}`} component={SaturationByOnionsPage} />
            <Route path={`${path}/period`} component={SaturationByPeriodPage} />
        </Flex>
    )
}

export default Reports
