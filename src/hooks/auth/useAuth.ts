import { useAppSelector } from 'hooks'

const useAuth = () => {
    const { email, token, id } = useAppSelector((state) => state.user)

    return {
        isAuth: !!email,
        email,
        token,
        id,
    }
}
export default useAuth
