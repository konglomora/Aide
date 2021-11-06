import React from 'react'
import Flex from '../../../StyledComponents/Flex'
import Title from '../../../StyledComponents/Title'
// tomorrow

interface IOnionPrecipitationCardProps {
    city: string
    last_time_update: string
    phrase: string
    tomorrow: string
    afterTomorrow: string
}

const OnionPrecipitationCard: React.FC<IOnionPrecipitationCardProps> = ({
    city,
    last_time_update,
    phrase,
    tomorrow,
    afterTomorrow,
}): JSX.Element => {
    const SLOTS_LINK: string | undefined =
        process.env.REACT_APP_ONION_SLOTS_LINK
    const onionSlotsLink: string = `${SLOTS_LINK}${city}/2021-10-15`

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
                <a href={onionSlotsLink} target={'blank'}>
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
export { OnionPrecipitationCard }
