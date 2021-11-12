import React from 'react'
import Flex from '../../../StyledComponents/Flex'
import TextContent from '../../../StyledComponents/TextContent'
import Title from '../../../StyledComponents/Title'

export interface IPrecipitationCardProps {
    isTomorrowWithPrecipitation: boolean
    isAfterTomorrowWithPrecipitation: boolean
    tomorrowDate: string
    afterTomorrowDate: string
    lastTimeUpdateOfTomorrow: string
    lastTimeUpdateOfAfterTomorrow: string
    tomorrowPlanOnionCards: React.ReactElement[]
    afterTomorrowPlanOnionCards: React.ReactElement[]
}

export const PrecipitationCard: React.FC<IPrecipitationCardProps> = (
    props
): React.ReactElement => {
    const {
        isTomorrowWithPrecipitation,
        isAfterTomorrowWithPrecipitation,
        tomorrowDate,
        afterTomorrowDate,
        lastTimeUpdateOfTomorrow,
        lastTimeUpdateOfAfterTomorrow,
        tomorrowPlanOnionCards,
        afterTomorrowPlanOnionCards,
    } = props

    if (isTomorrowWithPrecipitation && isAfterTomorrowWithPrecipitation) {
        return (
            <Flex>
                <Title fSize={'1.2em'}>
                    Согласование действий на завтра и {afterTomorrowDate}
                </Title>
                <Flex direction={'column'} align={'center'}>
                    <Title> Вероятность на завтра ({tomorrowDate})</Title>
                    <TextContent>
                        Обновление данных было произведено:{' '}
                        {lastTimeUpdateOfTomorrow}
                    </TextContent>
                    {tomorrowPlanOnionCards}
                </Flex>
                <Flex direction={'column'} align={'center'}>
                    <Title>
                        Вероятность на послезавтра ({afterTomorrowDate})
                    </Title>
                    <TextContent>
                        Обновление данных было произведено:
                        {lastTimeUpdateOfAfterTomorrow}
                    </TextContent>
                    {afterTomorrowPlanOnionCards}
                </Flex>
            </Flex>
        )
    } else if (
        isTomorrowWithPrecipitation &&
        !isAfterTomorrowWithPrecipitation
    ) {
        return (
            <Flex>
                <Flex direction={'column'} align={'center'}>
                    <Title fSize={'1.2em'}>
                        Согласование действий на завтра и {afterTomorrowDate}
                    </Title>
                    <Title> Вероятность на завтра ({tomorrowDate})</Title>
                    <TextContent>
                        Обновление данных было произведено:{' '}
                        {lastTimeUpdateOfTomorrow}
                    </TextContent>
                    {tomorrowPlanOnionCards}
                </Flex>
                <Flex direction={'column'} align={'center'}>
                    <TextContent>
                        По прогнозу на {afterTomorrowDate} осадков по всем
                        онионам нет.
                    </TextContent>
                    <TextContent>
                        Обновление данных было произведено:
                        {lastTimeUpdateOfAfterTomorrow}
                    </TextContent>
                </Flex>
            </Flex>
        )
    } else if (
        !isTomorrowWithPrecipitation &&
        isAfterTomorrowWithPrecipitation
    ) {
        return (
            <Flex>
                <Flex direction={'column'} align={'center'}>
                    <Title fSize={'1.2em'}>
                        Согласование действий на завтра и {afterTomorrowDate}
                    </Title>
                    <TextContent>
                        По прогнозу на {tomorrowDate} осадков по всем онионам
                        нет.
                    </TextContent>
                    <TextContent>
                        Обновление данных было произведено:
                        {lastTimeUpdateOfAfterTomorrow}
                    </TextContent>
                </Flex>
                <Flex direction={'column'} align={'center'}>
                    <Title> Вероятность на ({afterTomorrowDate})</Title>
                    <TextContent>
                        Обновление данных было произведено:{' '}
                        {lastTimeUpdateOfTomorrow}
                    </TextContent>
                    {tomorrowPlanOnionCards}
                </Flex>
            </Flex>
        )
    } else {
        return (
            <Flex
                direction={'column'}
                align={'center'}
                justify={'space-between'}
                height={'10em'}
            >
                <Title fSize={'1.2em'}>
                    Согласование действий на завтра и {afterTomorrowDate}
                </Title>
                <TextContent>KIE/KYI/KHA/DNP/LVI/ODS - normal mode</TextContent>
                <TextContent>
                    По прогнозу осадков на завтра и {afterTomorrowDate} по всем
                    онионам нет.
                </TextContent>
                <TextContent>
                    Обновление данных было произведено:
                    {lastTimeUpdateOfAfterTomorrow}
                </TextContent>
            </Flex>
        )
    }
}
