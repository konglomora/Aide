import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RootState } from 'store'
import { useAppSelector } from 'store/hooks'
import { Roles } from '../Auth/helpers'
import LoginPage from '../Auth/LoginPage'
import Homepage from '../Home/Homepage'
import { Page404 } from '../Page404/Page404'
import SaturationByPeriodPage from '../Reports/Saturation/Pages/SaturationByPeriodPage'
import SaturationBySelectedOnionPage from '../Reports/Saturation/Pages/SaturationBySelectedOnionPage'
import SchedulePage from '../onions/SchedulePage'
import WeatherActionPlan from '../WeatherActionPlan/Pages/WeatherActionPlan'
import Layout from './Layout'
import ReportsNavigation from './ReportsNavigation'
import SlotsNavbar from './SlotsNavbar'
import WeatherNavbar from './WeatherNavbar'

export const AppRoutes: FC = () => {
    const userRole = useAppSelector((state: RootState) => state.user.role)
    const userIsAdmin = userRole === Roles.admin
    const weatherRoutes = (
        <Route path="weather" element={<WeatherNavbar />}>
            <Route path="action-plan" element={<WeatherActionPlan />} />
        </Route>
    )
    const onionsRoutes = (
        <Route path="onions" element={<SlotsNavbar />}>
            <Route path="schedule" element={<SchedulePage />} />
        </Route>
    )
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path="reports" element={<ReportsNavigation />}>
                        <Route
                            path="period"
                            element={<SaturationByPeriodPage />}
                        />
                        <Route
                            path="onion-select"
                            element={<SaturationBySelectedOnionPage />}
                        />
                    </Route>
                    {userIsAdmin && weatherRoutes}
                    {onionsRoutes}
                    <Route path="*" element={<Page404 />} />
                </Route>
                <Route path="login" element={<LoginPage />} />
            </Routes>
        </>
    )
}
