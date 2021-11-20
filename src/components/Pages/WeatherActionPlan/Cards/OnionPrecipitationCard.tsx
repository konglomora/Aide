import React, { FC } from 'react'
import { REACT_APP_ONION_SLOTS_LINK } from '../../../../axios/env'
import { Flex } from '../../../StyledComponents/Flex'
import { Title } from '../../../StyledComponents/Title'
import dayjs from 'dayjs'

export interface IOnionPrecipitationCardProps {
    date: string
    city: string
    last_time_update: string
    phrase: string
    tomorrow: string
    afterTomorrow: string
}
const OnionPrecipitationCard: FC<IOnionPrecipitationCardProps> = ({
    date,
    city,
    last_time_update,
    phrase,
}) => {
    const tomorrowDate = dayjs().add(1, 'day').format('DD.MM')
    const dateOfReport: string =
        tomorrowDate === date
            ? dayjs().add(1, 'day').format('YYYY-MM-DD')
            : dayjs().add(2, 'day').format('YYYY-MM-DD')

    const SLOTS_LINK: string = REACT_APP_ONION_SLOTS_LINK
    const onionSlotsLink: string = `${SLOTS_LINK}${city}/${dateOfReport}`

    return (
        <Flex
            border="2px solid white"
            bRadius="15px"
            padding="15px"
            margin="10px"
            width="30%"
            mHeight="100%"
            bColor="rgb(24 25 26 / 78%);"
        >
            <div>
                <a
                    href={onionSlotsLink}
                    target={'blank'}
                    style={{ textDecoration: 'none' }}
                >
                    <Title
                        fWeight={'600'}
                        fSize={'1.5em'}
                        color="rgb(186, 143, 255)"
                    >
                        {city}
                    </Title>
                </a>
                <div>{phrase}</div>
            </div>
        </Flex>
    )
}
export { OnionPrecipitationCard }
