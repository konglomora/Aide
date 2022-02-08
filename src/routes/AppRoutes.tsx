import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RootState } from 'store'

import { Roles } from 'pages/authentication/userRoles'
import { LoginPage } from 'pages/authentication'
import { ProtectedRoutes, OnionsNavbar, WeatherNavbar } from 'pages/navigation'
import {
    SaturationByPeriod,
    SaturationBySelectedOnion,
} from 'pages/saturation/pages'
import SchedulePage from '../pages/onions/schedules/pages/Schedules'
import WeatherActionPlan from '../pages/weather/coordiantion/pages/Coordination'
import Layout from '../pages/navigation/Layout'
import SaturationNavigation from '../pages/navigation/SaturationNavbar'
import Slots from '../pages/onions/slots/pages/Slots'
import Experiments from '../pages/experiments/Experiments'
import { Homepage } from 'pages/homepage'
import { Page404 } from 'pages/404/Page404'
import { useAppSelector } from 'hooks'
import nextId from 'react-id-generator'

const AppRoutes: FC = () => {
    const userRole = useAppSelector((state: RootState) => state.user.role)
    const userIsAdmin = userRole === Roles.admin

    const weatherRoutes = (
        <Route key={nextId()} path="weather" element={<WeatherNavbar />}>
            <Route
                key={nextId()}
                path="coordination"
                element={<WeatherActionPlan />}
            />
        </Route>
    )

    const experimentRoutes = (
        <Route key={nextId()} path="experiments" element={<Experiments />} />
    )
    const adminRoutes = userIsAdmin && [experimentRoutes]

    const onionsRoutes = (
        <Route key={nextId()} path="onions" element={<OnionsNavbar />}>
            <Route key={nextId()} path="slots" element={<Slots />} />
            <Route key={nextId()} path="schedules" element={<SchedulePage />} />
        </Route>
    )

    const saturationRoutes = (
        <Route
            key={nextId()}
            path="saturation"
            element={<SaturationNavigation />}
        >
            <Route
                key={nextId()}
                path="period"
                element={<SaturationByPeriod />}
            />
            <Route
                key={nextId()}
                path="onion-select"
                element={<SaturationBySelectedOnion />}
            />
        </Route>
    )

    return (
        <Routes>
            <Route element={<ProtectedRoutes />}>
                <Route key={nextId()} path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                    {onionsRoutes}
                    {weatherRoutes}
                    {saturationRoutes}
                    {adminRoutes}
                    <Route path="*" element={<Page404 />} />
                </Route>
            </Route>
            <Route key={nextId()} path="/login" element={<LoginPage />} />
        </Routes>
    )
}

export default AppRoutes
