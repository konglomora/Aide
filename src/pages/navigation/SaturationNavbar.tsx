import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { StyledNavLink, stylesForStyledLink } from 'components/styled'
import { Navbar } from '.'

const SaturationNavbar = () => {
    const url = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (url.pathname === '/saturation') navigate('period')
    }, [navigate, url.pathname])

    return (
        <>
            <Navbar>
                <StyledNavLink
                    to={`period`}
                    {...stylesForStyledLink}
                    text={'Saturation report'}
                />
                <StyledNavLink
                    to={`onion-select`}
                    {...stylesForStyledLink}
                    text={'Onions saturation'}
                />
            </Navbar>
            <Outlet />
        </>
    )
}

export default SaturationNavbar
