import React from 'react'
import Flex from '../../../StyledComponents/Flex'
import Title from '../../../StyledComponents/Title'
import { onionSlotsLink } from '../../../../axios/private/adminSlotsLink'
// tomorrow
const OnionPrecipitationCard = ({
    city,
    last_time_update,
    phrase,
    tomorrow,
    afterTomorrow,
}) => {
    return (
        <Flex
            border={'2px solid white'}
            bRadius={'15px'}
            padding={'15px'}
            margin={'10px'}
            width={'30%'}
            mHeight={'100%'}
            height={' '}
            bColor={'rgb(24 25 26 / 78%);'}
        >
            <div>
                <a
                    href={`${onionSlotsLink}'/'${city}/2021-10-15`}
                    target={'blank'}
                >
                    <Title fWeight={'600'} fSize={'1.5em'}>
                        {city}
                    </Title>
                </a>

                {/*<div>{`Last time update: ${last_time_update} `}</div>*/}
                <div>{phrase}</div>
            </div>
            <div> </div>
        </Flex>
    )
}

export default OnionPrecipitationCard
