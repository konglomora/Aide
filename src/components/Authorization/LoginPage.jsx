import React from 'react'
import StyledNavLink from '../StyledComponents/StyledLink'
import Navbar, { stylesForStyledLink } from '../Navbar/Navbar'

const LoginPage = () => {
    return (
        <div>
            <h1>Log in</h1>

            <StyledNavLink
                exact
                {...stylesForStyledLink}
                to={'/Aide/register'}
                text={'OR REGISTER ✍'}
            />
        </div>
    )
}

export default LoginPage
