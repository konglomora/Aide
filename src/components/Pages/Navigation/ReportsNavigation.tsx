import { Outlet } from 'react-router-dom'
import StyledNavLink from '../../StyledComponents/StyledLink'
import Flex from '../../StyledComponents/Flex'

const stylesForStyledLink = {
    width: '20%',
    height: '2em',
    radius: '15px',
    text_align: 'center',
}

const ReportsNavigation = () => {
    return (
        <Flex direction={'column'}>
            <Flex
                justify={'space-evenly'}
                bBorder={'3px solid white'}
                padding={'20px 0px 10px'}
                bColor={'rgb(24,25,26)'}
            >
                <StyledNavLink
                    to={`period`}
                    {...stylesForStyledLink}
                    text={'Saturation report'}
                />
                <StyledNavLink
                    to={`onion-select`}
                    {...stylesForStyledLink}
                    text={'Onions saturation'}
                    width={'300px'}
                />
            </Flex>
            <Outlet />
        </Flex>
    )
}

export default ReportsNavigation
