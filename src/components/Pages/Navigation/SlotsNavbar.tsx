import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import StyledNavLink from '../../StyledComponents/StyledLink'
import { Flex } from '../../StyledComponents/Flex'
import { useEffect } from 'react'

const stylesForStyledLink = {
    width: '20%',
    height: '2em',
    radius: '15px',
    text_align: 'center',
}

const WeatherNavbar = () => {
    const url = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (url.pathname === '/onions') navigate('schedule')
    }, [navigate, url.pathname])

    return (
        <>
            <Flex
                justify={'space-evenly'}
                bBorder={'3px solid white'}
                padding={'1em 0px 1em'}
                bColor={'rgb(24,25,26)'}
                height="3%"
                mHeight="3%"
                top="0"
                left="10em"
                width="100%"
                position="fixed"
                zIndex="3"
            >
                <StyledNavLink
                    to="schedule"
                    {...stylesForStyledLink}
                    text="Schedule"
                />
                {/* <StyledNavLink
                    to="tomorrow"
                    {...stylesForStyledLink}
                    text="Tomorrow"
                    width="300px"
                />
                <StyledNavLink
                    to="later"
                    {...stylesForStyledLink}
                    text="Later"
                    width="300px"
                /> */}
            </Flex>
            <Outlet />
        </>
    )
}

export default WeatherNavbar
