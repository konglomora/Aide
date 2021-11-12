import { Redirect, Route, useRouteMatch } from 'react-router-dom'
import StyledNavLink from '../../StyledComponents/StyledLink'
import Flex from '../../StyledComponents/Flex'
import WeatherActionPlan from '../WeatherActionPlan/Pages/WeatherActionPlan'

const stylesForStyledLink = {
    width: '20%',
    height: '2em',
    radius: '15px',
    text_align: 'center',
}

const ReportsNavigation = () => {
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
                    to={`${url}/action-plan`}
                    {...stylesForStyledLink}
                    text={'Action plan'}
                />
                <StyledNavLink
                    to={`${url}/onion-select`}
                    {...stylesForStyledLink}
                    text={'Camcorders'}
                    width={'300px'}
                />
            </Flex>
            <Route path={`${path}/action-plan`} component={WeatherActionPlan} />
            <Route path={`${path}/camcorders`} component={WeatherActionPlan} />
            <Route exact path={path}>
                <Redirect to={`${path}/action-plan`} />
            </Route>
        </Flex>
    )
}

export default ReportsNavigation
