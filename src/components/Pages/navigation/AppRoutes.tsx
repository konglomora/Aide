import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RootState } from 'store'
import { useAppSelector } from 'store/hooks'
import { Roles } from '../Auth/helpers'
import LoginPage from '../Auth/LoginPage'
import Homepage from '../Home/Homepage'
import { Page404 } from '../Page404/Page404'
import SaturationByPeriodPage from '../saturation/Pages/SaturationByPeriodPage'
import SaturationBySelectedOnionPage from '../saturation/Pages/SaturationBySelectedOnionPage'
import SchedulePage from '../onions/SchedulePage'
import WeatherActionPlan from '../weather/Pages/WeatherActionPlan'
import Layout from './Layout'
import SaturationNavigation from './SaturationNavbar'
import SlotsNavbar from './OnionsNavbar'
import WeatherNavbar from './WeatherNavbar'
import Slots from '../onions/slots/SlotsPage'
import Experiments from '../experiments/Experiments'

export const AppRoutes: FC = () => {
    const userRole = useAppSelector((state: RootState) => state.user.role)
    const userIsAdmin = userRole === Roles.admin

    const weatherRoutes = (
        <Route path="weather" element={<WeatherNavbar />}>
            <Route path="action-plan" element={<WeatherActionPlan />} />
        </Route>
    )

    const experimentRoutes = (
        <Route path="experiments" element={<Experiments />}></Route>
    )
    const adminRoutes = [experimentRoutes]

    const onionsRoutes = (
        <Route path="onions" element={<SlotsNavbar />}>
            <Route path="slots" element={<Slots />} />
            <Route path="schedules" element={<SchedulePage />} />
        </Route>
    )
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path="saturation" element={<SaturationNavigation />}>
                        <Route
                            path="period"
                            element={<SaturationByPeriodPage />}
                        />
                        <Route
                            path="onion-select"
                            element={<SaturationBySelectedOnionPage />}
                        />
                    </Route>
                    {weatherRoutes}
                    {onionsRoutes}
                    {adminRoutes}
                    <Route path="*" element={<Page404 />} />
                </Route>
                <Route path="login" element={<LoginPage />} />
            </Routes>
        </>
    )
}
