import React, { MouseEventHandler } from 'react'
import { useDispatch } from 'react-redux'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import StyledNavLink from '../../StyledComponents/StyledLink'
import { stylesForStyledLink } from '../Navigation/Layout'
import { Form } from './Form'
import { setUser } from '../../../store/slices/userSlice'
const LoginPage = () => {
    const dispatch = useDispatch()

    const handleLogin = (email: string, password: string) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(console.log)
            .catch(console.error)
    }

    return (
        <div>
            <h1>Log in</h1>
            <Form title="Sign in" handleClick={handleLogin} />
            <StyledNavLink
                {...stylesForStyledLink}
                to={'/Aide/register'}
                text={'OR REGISTER ✍'}
            />
        </div>
    )
}

export default LoginPage
