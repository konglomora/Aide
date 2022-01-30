import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { StyledNavLink, stylesForStyledLink } from 'components/styled'
import { useEffect } from 'react'
import { Navbar } from '.'

const WeatherNavbar = () => {
    const url = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (url.pathname === '/weather') navigate('action-plan')
    }, [navigate, url.pathname])

    return (
        <>
            <Navbar>
                <StyledNavLink
                    to="action-plan"
                    {...stylesForStyledLink}
                    text="Action plan"
                />
            </Navbar>
            <Outlet />
        </>
    )
}

export default WeatherNavbar
