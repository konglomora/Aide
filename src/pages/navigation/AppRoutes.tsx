import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RootState } from 'store'
import { useAppSelector } from 'store/hooks'
import { Roles } from '../Auth/userRoles'
import LoginPage from '../Auth/LoginPage'
import { UnknownRouteHandler } from '../UnknownRouteHandler/Page404'
import SaturationByPeriodPage from '../saturation/pages/SaturationByPeriod'
import SaturationBySelectedOnionPage from '../saturation/pages/SaturationBySelectedOnion'
import SchedulePage from '../onions/SchedulePage'
import WeatherActionPlan from '../weather/Pages/WeatherActionPlan'
import Layout from './Layout'
import SaturationNavigation from './SaturationNavbar'
import SlotsNavbar from './OnionsNavbar'
import WeatherNavbar from './WeatherNavbar'
import Slots from '../onions/slots/SlotsPage'
import Experiments from '../experiments/Experiments'
import { ProtectedRoutes } from './ProtectedRoutes'
import Homepage from '../Home/Homepage'

export const AppRoutes: FC = () => {
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
        <Route path="onions" element={<SlotsNavbar />}>
            <Route path="slots" element={<Slots />} />
            <Route path="schedules" element={<SchedulePage />} />
        </Route>
    )

    const saturationRoutes = (
        <Route path="saturation" element={<SaturationNavigation />}>
            <Route path="period" element={<SaturationByPeriodPage />} />
            <Route
                path="onion-select"
                element={<SaturationBySelectedOnionPage />}
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
                    <Route path="*" element={<UnknownRouteHandler />} />
                </Route>
            </Route>
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}
