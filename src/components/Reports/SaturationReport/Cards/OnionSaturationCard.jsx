import React from 'react'
import Flex from '../../../StyledComponents/Flex'
import Title from '../../../StyledComponents/Title'

const OnionSaturationCard = (props) => {
    return (
        <Flex
            border={'2px solid white'}
            bRadius={'15px'}
            padding={'15px'}
            margin={'10px'}
            width={'18%'}
            mHeight={'100%'}
            height={' '}
            bColor={'rgb(24 25 26 / 78%);'}
        >
            <div>
                <Title fWeight={'600'} fSize={'1.5em'}>
                    {props.city}
                </Title>
                <div>
                    {props.saturation.map((saturationAtSlotData, id) => (
                        <div key={id}>{saturationAtSlotData}</div>
                    ))}
                </div>
                <div>{props.difference}</div>
                {props.forAutoReport ? (
                    ''
                ) : (
                    <div>{props.reason_saturation}</div>
                )}
                <div>{props.slotFilledStr}</div>
                <div>
                    <span>{props.area}</span>
                    <span>{props.level_sat}</span>
                </div>
            </div>
            <div> </div>
        </Flex>
    )
}

export default OnionSaturationCard
