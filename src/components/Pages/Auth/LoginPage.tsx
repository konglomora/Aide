import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../../store/slices/userSlice'
import { Form } from './Form'
import { useAppDispatch } from '../../../store/hooks'
import { Flex } from '../../StyledComponents/Flex'
import { getUserRole } from './helpers'

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
                        role: getUserRole(user.email!),
                    })
                )

                console.log(
                    '[Login page] Logged in as: ',
                    getUserRole(user.email!)
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
        </Flex>
    )
}

export default LoginPage
