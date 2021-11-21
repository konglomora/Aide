import React, { FC, useEffect, useState } from 'react'
import { REACT_APP_ONION_SLOTS_LINK } from '../../../../axios/env'
import { Flex } from '../../../StyledComponents/Flex'
import { Title } from '../../../StyledComponents/Title'
import dayjs from 'dayjs'
import { areasInfo } from '../../../../store/helpers/AreasInfo'
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
    const [responsibleManagerTelegramNick, setResponsibleManagerTelegramNick] =
        useState<string>('')
    const tomorrowDate = dayjs().add(1, 'day').format('DD.MM')
    const dateOfReport: string =
        tomorrowDate === date
            ? dayjs().add(1, 'day').format('YYYY-MM-DD')
            : dayjs().add(2, 'day').format('YYYY-MM-DD')

    const SLOTS_LINK: string = REACT_APP_ONION_SLOTS_LINK
    const onionSlotsLink: string = `${SLOTS_LINK}${city}/${dateOfReport}`

    useEffect(() => {
        const areaCodes = Object.keys(areasInfo)
        areaCodes.forEach((areaCode) => {
            if (areasInfo[areaCode].areaOnionCodes.includes(city)) {
                setResponsibleManagerTelegramNick(
                    areasInfo[areaCode].opsManagerTelegramNick
                )
            }
        })
    })

    return (
        <Flex
            border="2px solid white"
            bRadius="15px"
            padding="15px"
            margin="10px"
            width="80%"
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
                <div>{responsibleManagerTelegramNick}</div>
                <div>{phrase}</div>
            </div>
            <div></div>
        </Flex>
    )
}
export { OnionPrecipitationCard }
