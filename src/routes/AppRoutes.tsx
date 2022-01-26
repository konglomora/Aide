import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RootState } from 'store'
import { useAppSelector } from 'store/hooks'
import { Roles } from 'pages/authentication/userRoles'
import { LoginPage } from 'pages/authentication'
import { ProtectedRoutes, OnionsNavbar, WeatherNavbar } from 'pages/navigation'
import {
    SaturationByPeriod,
    SaturationBySelectedOnion,
} from 'pages/saturation/pages'
import SchedulePage from '../pages/onions/SchedulePage'
import WeatherActionPlan from '../pages/weather/Pages/WeatherActionPlan'
import Layout from '../pages/navigation/Layout'
import SaturationNavigation from '../pages/navigation/SaturationNavbar'
import Slots from '../pages/onions/slots/SlotsPage'
import Experiments from '../pages/experiments/Experiments'
import { Homepage } from 'pages/home'
import { Page404 } from 'pages/404/Page404'

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
