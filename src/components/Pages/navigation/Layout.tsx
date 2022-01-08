import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../../../hooks/use-auth'
import Sidebar from './Sidebar'

const Layout = () => {
    const navigate = useNavigate()
    const { isAuth } = useAuth()

    useEffect(() => {
        isAuth ? navigate('/') : navigate('login')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth])

    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    )
}

export default Layout
