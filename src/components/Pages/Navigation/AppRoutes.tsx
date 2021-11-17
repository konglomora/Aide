import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../Authorization/LoginPage'
import RegisterPage from '../Authorization/RegisterPage'
import Homepage from '../Homepage/Homepage'
import Page404 from '../Page404/Page404'
import SaturationByPeriodPage from '../Reports/Saturation/Pages/SaturationByPeriodPage'
import SaturationBySelectedOnionPage from '../Reports/Saturation/Pages/SaturationBySelectedOnionPage'
import WeatherActionPlan from '../WeatherActionPlan/Pages/WeatherActionPlan'
import Layout from './Layout'
import ReportsNavigation from './ReportsNavigation'
import WeatherNavbar from './WeatherNavbar'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Homepage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="reports" element={<ReportsNavigation />}>
                    <Route path="period" element={<SaturationByPeriodPage />} />
                    <Route
                        path="onion-select"
                        element={<SaturationBySelectedOnionPage />}
                    />
                </Route>
                <Route path="weather" element={<WeatherNavbar />}>
                    <Route path="action-plan" element={<WeatherActionPlan />} />
                    <Route
                        path="onion-select"
                        element={<SaturationBySelectedOnionPage />}
                    />
                </Route>
                <Route path="*" element={<Page404 />} />
            </Route>
        </Routes>
    )
}
