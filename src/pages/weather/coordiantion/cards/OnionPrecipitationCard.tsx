import { FC, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Flex, Title, AideColors } from 'components/styled'
import { IOnionWeatherAnalysis } from 'store/slices/weather/types'
import { areas } from 'services/coordination/AreasInfo'

const OnionPrecipitationCard: FC<IOnionWeatherAnalysis> = ({
    date,
    city,
    percent_capacity_slots,
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
    const [responsibleManagerTelegramNick, setResponsibleManagerTelegramNick] =
        useState<string>('')
    const { REACT_APP_ONION_SLOTS_LINK } = process.env
    const [bonusSentence, setBonusSentence] = useState('')
    const [slotsSentence, setSlotsSentence] = useState('')

    const tomorrowDate = dayjs().add(1, 'day').format('DD.MM')
    const dateOfReport: string =
        tomorrowDate === date
            ? dayjs().add(1, 'day').format('YYYY-MM-DD')
            : dayjs().add(2, 'day').format('YYYY-MM-DD')

    const onionSlotsLink: string = `${REACT_APP_ONION_SLOTS_LINK}${city}/${dateOfReport}`
    const wetPeriod = `${wetStartSlot} - ${wetFinishSlot}`
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        // const areaCodes = Object.keys(areas)
        // areaCodes.forEach((areaCode) => {
        //     if (areas[areaCode].areaOnionCodes.includes(city)) {
        //         setResponsibleManagerTelegramNick(
        //             areas[areaCode].opsManagerTelegramNick
        //         )
        //     }
        // })
    })

    const prepStr = `Probability of rainfall at ${slots} equals ${precipitation}`

    return (
        <Flex
            border="3px solid white"
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
                        color={AideColors.violet}
                    >
                        {city}
                    </Title>
                </a>
                <div>{responsibleStaffTGNick}</div>
                <div>{prepStr}</div>
                <div>
                    Bonus: {bonusSizeIncrease}% {bonusReason} for {wetPeriod}
                </div>
                <div>
                    Capacity: {capacitySizeIncrease}% for {wetPeriod}
                </div>
                <div>Challenges: {challenges} </div>
                <div>Saturation Bot: {saturationBotMode}</div>
                <div>Mode: {mode}</div>
            </div>
            <div></div>
        </Flex>
    )
}
export { OnionPrecipitationCard }
