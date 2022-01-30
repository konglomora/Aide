import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from 'hooks'
import { setUser } from 'store/slices/user/userSlice'
import { StyledNavLink, stylesForStyledLink } from 'components/styled'
import { Form } from 'pages/authentication'
import { alertService } from 'services/AlertService'

const RegisterPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

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
                alertService.error('Oops! Error while registration!')
            })
    }
    return (
        <div>
            <h1>Register</h1>
            <Form title="Register" handleClick={handleRegister} />
            <StyledNavLink
                {...stylesForStyledLink}
                to={'/login'}
                text={'ALREADY HAVE AN ACCOUN? SIGN IN 🔓'}
            />
        </div>
    )
}

export default RegisterPage
