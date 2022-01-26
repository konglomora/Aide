import { useAuth } from 'hooks/use-auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const ProtectedRoutes = () => {
    const { isAuth } = useAuth()
    const location = useLocation()

    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to={'/login'} replace state={{ from: location }} />
    )
}
