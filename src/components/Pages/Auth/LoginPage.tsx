import React from 'react'
import StyledNavLink from '../../StyledComponents/StyledLink'
import { stylesForStyledLink } from '../Navigation/Layout'

const LoginPage = () => {
    return (
        <div>
            <h1>Log in</h1>

            <StyledNavLink
                {...stylesForStyledLink}
                to={'/Aide/register'}
                text={'OR REGISTER ✍'}
            />
        </div>
    )
}

export default LoginPage
