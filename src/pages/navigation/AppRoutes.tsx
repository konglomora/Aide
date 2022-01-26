import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RootState } from 'store'
import { useAppSelector } from 'store/hooks'
import { Roles } from 'pages/auth/userRoles'
import { LoginPage } from 'pages/auth'
import {
    Page404,
    ProtectedRoutes,
    OnionsNavbar,
    WeatherNavbar,
} from 'pages/navigation'
import {
    SaturationByPeriod,
    SaturationBySelectedOnion,
} from 'pages/saturation/pages'
import SchedulePage from '../onions/SchedulePage'
import WeatherActionPlan from '../weather/Pages/WeatherActionPlan'
import Layout from './Layout'
import SaturationNavigation from './SaturationNavbar'
import Slots from '../onions/slots/SlotsPage'
import Experiments from '../experiments/Experiments'
import { Homepage } from 'pages/home'

const AppRoutes: FC = () => {
    const userRole = useAppSelector((state: RootState) => state.user.role)
    const userIsAdmin = userRole === Roles.admin

    const weatherRoutes = (
        <Route path="weather" element={<WeatherNavbar />}>
            <Route path="action-plan" element={<WeatherActionPlan />} />
        </Route>
    )

    const experimentRoutes = (
        <Route path="experiments" element={<Experiments />} />
    )
    const adminRoutes = userIsAdmin && [experimentRoutes]

    const onionsRoutes = (
        <Route path="onions" element={<OnionsNavbar />}>
            <Route path="slots" element={<Slots />} />
            <Route path="schedules" element={<SchedulePage />} />
        </Route>
    )

    const saturationRoutes = (
        <Route path="saturation" element={<SaturationNavigation />}>
            <Route path="period" element={<SaturationByPeriod />} />
            <Route
                path="onion-select"
                element={<SaturationBySelectedOnion />}
            />
        </Route>
    )

    return (
        <Routes>
            <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                    {onionsRoutes}
                    {weatherRoutes}
                    {saturationRoutes}
                    {adminRoutes}
                    <Route path="*" element={<Page404 />} />
                </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}

export default AppRoutes
