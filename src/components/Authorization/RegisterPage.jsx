import React from 'react'
import StyledNavLink from '../StyledComponents/StyledLink'
import { stylesForStyledLink } from '../Navbar/Navbar'

const RegisterPage = () => {
    return (
        <div>
            <h1>Register</h1>
            <StyledNavLink
                exact
                {...stylesForStyledLink}
                to={'/Aide/login'}
                text={'ALREADY HAVE AN ACCOUN? SIGN IN 🔓'}
            />
        </div>
    )
}

export default RegisterPage
