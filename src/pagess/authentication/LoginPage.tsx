import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { setUser } from 'store/slices/userSlice'
import { Form } from 'pages/authentication'
import { useAppDispatch } from 'store/hooks'
import { capitalizeFirstLetter } from 'helpers/strings'
import { getUserRole } from 'pages/authentication'
import { Flex } from 'components/styled'
import { alertService } from 'services/AlertService'

const LoginPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    console.log('Login Page location.state?.from', location.state)
    const from = location.state?.from?.pathname || '/'

    const handleLogin = (email: string, password: string) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                const name = capitalizeFirstLetter(user.email?.split('.')[0])
                const surname = capitalizeFirstLetter(
                    user.email?.split('.')[1].split('@')[0]
                )
                dispatch(
                    setUser({
                        id: user.uid,
                        email: user.email,
                        name,
                        surname,
                        token: user.refreshToken,
                        role: getUserRole(user.email!),
                    })
                )

                console.log(
                    '[Login page] Logged in as: ',
                    getUserRole(user.email!)
                )
                alertService.success('Logged in successful!', {
                    autoClose: 1000,
                })
                navigate(from, { replace: true })
            })
            .catch(() => {
                alertService.error('Ooops! Wrong password or email!')
            })
    }

    return (
        <Flex>
            <Form title="Sign in" handleClick={handleLogin} />
        </Flex>
    )
}

export default LoginPage
