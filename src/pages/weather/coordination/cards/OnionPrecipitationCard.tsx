import { FC } from 'react'
import dayjs from 'dayjs'
import { Title, AideColors, TextBlock, GlovoColors } from 'components/styled'
import { IOnionWeatherAnalysis } from 'store/slices/weather/types'
import { DataCardWrapper } from 'components/styled/DataCardWrapper'
import { useAppSelector } from 'hooks'
import { Theme } from 'components/themes'

const OnionPrecipitationCard: FC<IOnionWeatherAnalysis> = ({
    date,
    city,
    slots,
    wetStartSlot,
    wetFinishSlot,
    precipitation,
    bonusSizeIncrease,
    capacitySizeIncrease,
    bonusReason,
    saturationBotMode,
    mode,
    challenges,
    responsibleStaffTGNick,
}) => {
    const tomorrowDate = dayjs().add(1, 'day').format('DD.MM')
    const dateOfReport: string =
        tomorrowDate === date
            ? dayjs().add(1, 'day').format('YYYY-MM-DD')
            : dayjs().add(2, 'day').format('YYYY-MM-DD')

    const onionSlotsLink: string = `${process.env.REACT_APP_ONION_SLOTS_LINK}${city}/${dateOfReport}`
    const wetPeriod = `${wetStartSlot} - ${wetFinishSlot}`
    const theme = useAppSelector((state) => state.theme.theme)
    const linkColor =
        theme === Theme.aide ? AideColors.violet : GlovoColors.yellow
    const prepStr = `Probability of rainfall at ${slots} equals ${precipitation}`
    const capacityStr =
        capacitySizeIncrease > 0
            ? ` ${capacitySizeIncrease}% for ${wetPeriod}`
            : ' -'

    return (
        <DataCardWrapper>
            <TextBlock>
                <a
                    href={onionSlotsLink}
                    target={'blank'}
                    style={{ textDecoration: 'none' }}
                >
                    <Title fWeight={'700'} fSize={'1.5em'} color={linkColor}>
                        {city}
                    </Title>
                </a>
                <TextBlock>{responsibleStaffTGNick}</TextBlock>
                <TextBlock>{prepStr}</TextBlock>
                <TextBlock>
                    Bonus: {bonusSizeIncrease}% {bonusReason} for {wetPeriod}
                </TextBlock>
                <TextBlock>Capacity: {capacityStr}</TextBlock>
                <TextBlock>Challenges: {challenges} </TextBlock>
                <TextBlock>Saturation Bot: {saturationBotMode}</TextBlock>
                <TextBlock>Mode: {mode}</TextBlock>
            </TextBlock>
            <div></div>
        </DataCardWrapper>
        // </Flex>
    )
}
export { OnionPrecipitationCard }
