import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import StyledNavLink from '../../StyledComponents/StyledLink'
import { stylesForStyledLink } from '../Navigation/Layout'
import { Form, FormProps } from './Form'
import { setUser } from '../../../store/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store/hooks'
import Flex from '../../StyledComponents/Flex'
import TextContent from '../../StyledComponents/TextContent'
import Button from '../../StyledComponents/Button'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/use-auth'

const LoginPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [displaySignInError, setDisplaySignInError] = useState<string>('none')

    const handleLogin = (email: string, password: string) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    setUser({
                        id: user.uid,
                        email: user.email,
                        token: user.refreshToken,
                    })
                )
                navigate('/')
            })
            .catch(() => {
                setDisplaySignInError('block')
            })
    }

    return (
        <Flex>
            <Form
                title="Sign in"
                handleClick={handleLogin}
                displaySignInError={displaySignInError}
            />
            {/* <StyledNavLink
                {...stylesForStyledLink}
                to={'/register'}
                text={'OR REGISTER ✍'}
            /> */}
        </Flex>
    )
}

export default LoginPage
