import React from 'react'
import Flex from '../../StyledComponents/Flex'

const OnionSaturationCard = (props) => {
    return (
        <Flex
            border={'2px solid white'}
            bRadius={'15px'}
            padding={'25px'}
            margin={'10px'}
        >
            <div>
                <h1>{props.city}</h1>
                <div>
                    {props.saturation.map((saturationAtSlotData, id) => (
                        <div key={id}>{saturationAtSlotData}</div>
                    ))}
                </div>
                <div>{props.difference}</div>
                <div>{props.reason_saturation}</div>
                <div>{props.slotFilledStr}</div>
                <div>
                    <span>{props.area}</span>
                    <span>{props.level_sat}</span>
                </div>
            </div>
        </Flex>
    )
}

export default OnionSaturationCard
