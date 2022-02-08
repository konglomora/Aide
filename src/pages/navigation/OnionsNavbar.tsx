import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { StyledNavLink, stylesForStyledLink } from 'components/styled'
import { Navbar } from '.'

const OnionsNavbar = () => {
    const url = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (url.pathname === '/onions') navigate('slots')
    }, [navigate, url.pathname])

    return (
        <>
            <Navbar>
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
                {/* <StyledNavLink
                    to="communications"
                    {...stylesForStyledLink}
                    text="Communications"
                    width="300px"
                /> */}
            </Navbar>
            <Outlet />
        </>
    )
}

export default OnionsNavbar
