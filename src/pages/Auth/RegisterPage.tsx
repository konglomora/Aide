import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'store/hooks'
import { setUser } from 'store/slices/userSlice'
import { StyledNavLink, stylesForStyledLink } from 'components/styled'
import { Form } from 'pages/auth'

const RegisterPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [displaySignInError, setDisplaySignInError] = useState<string>('none')

    const handleRegister = (email: string, password: string) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user)
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
        <div>
            <h1>Register</h1>
            <Form
                title="Register"
                handleClick={handleRegister}
                displaySignInError={displaySignInError}
            />
            <StyledNavLink
                {...stylesForStyledLink}
                to={'/login'}
                text={'ALREADY HAVE AN ACCOUN? SIGN IN 🔓'}
            />
        </div>
    )
}

export default RegisterPage
