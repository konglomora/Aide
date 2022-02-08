import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { StyledNavLink, stylesForStyledLink } from 'components/styled'
import { useEffect } from 'react'
import { Navbar } from '.'

const WeatherNavbar = () => {
    const url = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (url.pathname === '/weather') navigate('coordination')
    }, [navigate, url.pathname])

    return (
        <>
            <Navbar>
                <StyledNavLink
                    to="coordination"
                    {...stylesForStyledLink}
                    text="Coordination"
                />
            </Navbar>
            <Outlet />
        </>
    )
}

export default WeatherNavbar
