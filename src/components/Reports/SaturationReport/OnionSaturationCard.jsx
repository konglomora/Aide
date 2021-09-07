import React from 'react'

const OnionSaturationCard = (props) => {
    return (
        <div>
            <h1>{props.city}</h1>
            <div>
                {props.saturation.map((saturationAtSlotData, id) => (
                    <div key={id}>{saturationAtSlotData}</div>
                ))}
            </div>
            <div>{props.difference}</div>
            <div>{props.reason_saturation}</div>
            {/*<div>Заранее расширяли слоты - постепенно заполнялись.</div>*/}
            {/*<div>Заранее расширяли слоты - слабо заполнялись.</div>*/}
            <div>
                <span>{props.area}</span>
                <span>{props.level_sat}</span>
            </div>
        </div>
    )
}

export default OnionSaturationCard
