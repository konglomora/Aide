import { FC, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RootState } from 'store'
import { useAppSelector } from 'store/hooks'
import LoginPage from '../Auth/LoginPage'
import RegisterPage from '../Auth/RegisterPage'
import Homepage from '../Home/Homepage'
import { Page404 } from '../Page404/Page404'
import SaturationByPeriodPage from '../Reports/Saturation/Pages/SaturationByPeriodPage'
import SaturationBySelectedOnionPage from '../Reports/Saturation/Pages/SaturationBySelectedOnionPage'
import SlotsPage from '../Slots/SlotsPage'
import WeatherActionPlan from '../WeatherActionPlan/Pages/WeatherActionPlan'
import Layout from './Layout'
import ReportsNavigation from './ReportsNavigation'
import SlotsNavbar from './SlotsNavbar'
import WeatherNavbar from './WeatherNavbar'

export const AppRoutes: FC = () => {
    const userIsAdmin = useAppSelector((state: RootState) => state.user.isAdmin)
    console.log('Hello from sync')
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
                    {userIsAdmin && (
                        <Route path="weather" element={<WeatherNavbar />}>
                            <Route
                                path="action-plan"
                                element={<WeatherActionPlan />}
                            />
                        </Route>
                    )}
                    <Route path="slots" element={<SlotsNavbar />}>
                        <Route path="today" element={<SlotsPage />} />
                        <Route path="tomorrow" element={<SlotsPage />} />
                        <Route path="later" element={<SlotsPage />} />
                    </Route>
                    <Route path="*" element={<Page404 />} />
                </Route>
                <Route path="login" element={<LoginPage />} />
            </Routes>
        </>
    )
}
