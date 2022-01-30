import { useAuth } from 'hooks'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoutes = () => {
    const { isAuth } = useAuth()
    const location = useLocation()

    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to={'/login'} replace state={{ from: location }} />
    )
}

export default ProtectedRoutes
