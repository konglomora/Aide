import React from 'react'
import { Flex, Title } from 'components/styled'
import { DayCoordinationCard } from './DayCoordinationCard'
import nextId from 'react-id-generator'

export interface IPrecipitationCardProps {
    isTomorrowWithPrecipitation: boolean
    isAfterTomorrowWithPrecipitation: boolean
    tomorrowDate: string
    afterTomorrowDate: string
    lastTimeUpdateOfTomorrow: string
    lastTimeUpdateOfAfterTomorrow: string
    tomorrowPlanOnionCards: React.ReactElement[][]
    afterTomorrowPlanOnionCards: React.ReactElement[][]
}

export const ActionPlanCard: React.FC<IPrecipitationCardProps> = (
    props
): React.ReactElement => {
    const {
        tomorrowDate,
        afterTomorrowDate,
        lastTimeUpdateOfTomorrow,
        lastTimeUpdateOfAfterTomorrow,
        tomorrowPlanOnionCards,
        afterTomorrowPlanOnionCards,
    } = props

    const coordinationDays = [
        {
            coordinationCards: tomorrowPlanOnionCards,
            coordinationDate: tomorrowDate,
            lastTimeUpdate: lastTimeUpdateOfTomorrow,
        },
        {
            coordinationCards: afterTomorrowPlanOnionCards,
            coordinationDate: afterTomorrowDate,
            lastTimeUpdate: lastTimeUpdateOfAfterTomorrow,
        },
    ]

    const coordinations = coordinationDays.map((day) => (
        <DayCoordinationCard
            key={nextId()}
            coordinationCards={day.coordinationCards}
            coordinationDate={day.coordinationDate}
            lastTimeUpdate={day.lastTimeUpdate}
        />
    ))
    return (
        <Flex direction="column" align="center" width="75%" margin="10em 0 0 0">
            <Title fWeight="700">
                Coordination of RTO actions for {tomorrowDate} and
                {afterTomorrowDate}
            </Title>
            {coordinations}
        </Flex>
    )
}
