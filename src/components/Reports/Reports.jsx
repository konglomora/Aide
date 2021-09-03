import React from 'react';
import SaturationReportPage from "./SaturationReport/SaturationReportPage";
import WeatherActionPlanPage from "./WeatherActionPlanReport/WeatherActionPlanPage";

const Reports = () => {
    return (
        <div>
            <SaturationReportPage />
            <WeatherActionPlanPage />
        </div>
    );
};

export default Reports;