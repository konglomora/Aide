import React from 'react';

const OnionAnalytic = (props) => {
    return (
        <div>
            <h1>{props.city}</h1>
            <div>{props.saturation.map((saturationAtSlotData, id) =>  <div key={id} >{saturationAtSlotData}</div>)}</div>
            <div>{props.difference}</div>
            <div>{props.reason_saturation}</div>
            <div>

                <span>{props.area}</span>
                <span>{props.level_saturation}</span>
            </div>
        </div>
    );
};

export default OnionAnalytic;