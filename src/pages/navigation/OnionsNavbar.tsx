import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Flex, StyledNavLink } from 'components/styled'

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
        if (url.pathname === '/onions') navigate('slots')
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
                    to="slots"
                    {...stylesForStyledLink}
                    text="Slots"
                    width="300px"
                />
                <StyledNavLink
                    to="schedules"
                    {...stylesForStyledLink}
                    text="Schedules"
                />
                <StyledNavLink
                    to="communications"
                    {...stylesForStyledLink}
                    text="Communications"
                    width="300px"
                />
            </Flex>
            <Outlet />
        </>
    )
}

export default WeatherNavbar
