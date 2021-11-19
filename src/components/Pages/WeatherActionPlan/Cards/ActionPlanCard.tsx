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

export const ActionPlanCard: React.FC<IPrecipitationCardProps> = (
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

    const styleForCard = {
        direction: 'row',
        width: '90%',
        wrap: 'wrap',
        border: '2px solid white',
        justify: 'space-evenly',
        align: 'stretch',
        padding: '10px',
        bRadius: '10px',
        bFilter: 'blur(2px)',
        margin: '10px 0px',
    }

    if (isTomorrowWithPrecipitation && isAfterTomorrowWithPrecipitation) {
        return (
            <Flex direction="column" align={'center'}>
                <Title>
                    Согласование действий на завтра и {afterTomorrowDate}
                </Title>
                <Flex {...styleForCard}>
                    <Title> Вероятность на завтра ({tomorrowDate})</Title>
                    <TextContent>
                        Обновление данных было произведено:{' '}
                        {lastTimeUpdateOfTomorrow}
                    </TextContent>
                    {tomorrowPlanOnionCards}
                </Flex>
                <Flex {...styleForCard}>
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
            <Flex direction="column" align={'center'}>
                <Flex {...styleForCard}>
                    <Title>
                        Согласование действий на завтра и {afterTomorrowDate}
                    </Title>
                </Flex>
                <Flex {...styleForCard}>
                    <Title> Вероятность на завтра ({tomorrowDate})</Title>
                    <TextContent>
                        Обновление данных было произведено:{' '}
                        {lastTimeUpdateOfTomorrow}
                    </TextContent>
                    {tomorrowPlanOnionCards}
                </Flex>
                <Flex {...styleForCard}>
                    <TextContent>
                        По прогнозу на {afterTomorrowDate} осадков по всем
                        онионам нет.
                    </TextContent>
                </Flex>
            </Flex>
        )
    } else if (
        !isTomorrowWithPrecipitation &&
        isAfterTomorrowWithPrecipitation
    ) {
        return (
            <Flex direction={'column'} align={'center'}>
                <Flex {...styleForCard}>
                    <Title>
                        Согласование действий на завтра и {afterTomorrowDate}
                    </Title>
                </Flex>
                <Flex {...styleForCard}>
                    <TextContent>
                        По прогнозу на {tomorrowDate} осадков по всем онионам
                        нет.
                    </TextContent>
                </Flex>
                <Flex {...styleForCard}>
                    <Title> Вероятность на ({afterTomorrowDate})</Title>
                    <TextContent>
                        Обновление данных было произведено:
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
            </Flex>
        )
    }
}
