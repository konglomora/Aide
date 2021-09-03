import React from 'react';
import ChartOfBigOnions from "./ChartOfBigOnions";
import ChartOfSmallOnions from "./ChartOfSmallOnions";

const ChartsPage = () => {
    return (
        <div>
            Charts page
            <ChartOfBigOnions />
            <ChartOfSmallOnions/>
        </div>
    );
};

export default ChartsPage;