import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { StyledNavLink, stylesForStyledLink, Flex } from 'components/styled'

const SaturationNavbar = () => {
    const url = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (url.pathname === '/saturation') navigate('period')
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
        </>
    )
}

export default SaturationNavbar
