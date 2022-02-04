import { FC, useEffect, useState } from 'react'
import dayjs from 'dayjs'
// import { REACT_APP_ONION_SLOTS_LINK } from 'api/env'
import { Flex, Title, Colors } from 'components/styled'
import { areasInfo } from 'store/helpers/AreasInfo'
import { IOnionWeatherAnalysis } from 'store/slices/weather/types'

export enum Actions {
    expand = 'Расширяем заполненные слоты с вероятностью на 10%.',
    notFilled = 'Слоты не заполнены.',
    addFullBonus = 'Бонус +40BW на  слоты',
    addHalfBonus = 'Бонус +20BW на  слоты',
}

interface IOnionCodesForBonus {
    kyiv: string[]
    satellites: string[]
    mio: string[]
}

const onionCodesForBonus: IOnionCodesForBonus = {
    kyiv: ['KIE', 'KYI'],
    satellites: ['BRO', 'BOR', 'IRP', 'KRU'],
    mio: ['DNP', 'KHA', 'LVI', 'ODS'],
}

export enum AreasForBonus {
    kyiv = 'KYIV',
    satellite = 'SATELLITE',
    mio = 'MIO',
    small = 'SMALL',
}

const getAreaForBonus = (code: string): string => {
    if (onionCodesForBonus.kyiv.includes(code)) {
        return AreasForBonus.kyiv
    } else if (onionCodesForBonus.satellites.includes(code)) {
        return AreasForBonus.satellite
    } else if (onionCodesForBonus.mio.includes(code)) {
        return AreasForBonus.mio
    }
    return AreasForBonus.small
}
export interface IResourceByArea {
    KYIV: {
        bonus: {
            full: number
            partial: number
            rest: number
        }
        slots: {
            high: number
            medium: number
            normal: number
            low: number
        }
    }
    SATELLITE: {
        bonus: {
            full: number
            partial: number
            rest: number
        }
        slots: {
            high: number
            medium: number
            normal: number
            low: number
        }
    }
    MIO: {
        bonus: {
            full: number
            partial: number
            rest: number
        }
        slots: {
            high: number
            medium: number
            normal: number
            low: number
        }
    }
    SMALL: {
        bonus: {
            full: number
            partial: number
            rest: number
        }
        slots: {
            high: number
            medium: number
            normal: number
            low: number
        }
    }
}
export const ResourceByArea = {
    KYIV: {
        bonus: {
            full: 30,
            partial: 20,
            rest: 10,
        },
        slots: {
            high: 15,
            medium: 10,
            normal: 5,
            low: 3,
        },
    },
    SATELLITE: {
        bonus: {
            full: 30,
            partial: 20,
            rest: 10,
        },
        slots: {
            high: 30,
            medium: 15,
            normal: 10,
            low: 5,
        },
    },
    MIO: {
        bonus: {
            full: 40,
            partial: 20,
            rest: 20,
        },
        slots: {
            high: 15,
            medium: 10,
            normal: 5,
            low: 3,
        },
    },
    SMALL: {
        bonus: {
            full: 40,
            partial: 20,
            rest: 20,
        },
        slots: {
            high: 30,
            medium: 15,
            normal: 10,
            low: 5,
        },
    },
}

const OnionPrecipitationCard: FC<IOnionWeatherAnalysis> = ({
    date,
    city,
    percent_capacity_slots,
    slots,
    precipitation,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const areaCodes = Object.keys(areasInfo)
        areaCodes.forEach((areaCode) => {
            if (areasInfo[areaCode].areaOnionCodes.includes(city)) {
                setResponsibleManagerTelegramNick(
                    areasInfo[areaCode].opsManagerTelegramNick
                )
            }
        })
        const area = getAreaForBonus(city)
        const slotsEmpty = percent_capacity_slots === 0
        const slotsPartiallyFilled =
            percent_capacity_slots <= 50 && percent_capacity_slots > 0
        const slotsFullFilled = percent_capacity_slots >= 55

        if (slotsEmpty) {
            const bonusStr = `Добавить +${
                ResourceByArea[area as keyof IResourceByArea].bonus.full
            }% BW на слоты  ${slots}`
            const slotsStr = `Слоты не заполнены.`
            setBonusSentence(bonusStr)
            setSlotsSentence(slotsStr)
        }

        if (slotsPartiallyFilled) {
            const bonusStr = `Добавить +${
                ResourceByArea[area as keyof IResourceByArea].bonus.partial
            }% RUSH на слоты  ${slots},   по факту осадков добавить +${
                ResourceByArea[area as keyof IResourceByArea].bonus.rest
            }% BW.`
            const slotsStr = `Расширить слоты ${slots} на ${
                ResourceByArea[area as keyof IResourceByArea].slots.high
            }%`
            setBonusSentence(bonusStr)
            setSlotsSentence(slotsStr)
        }

        if (slotsFullFilled) {
            const bonusStr = `Добавить +${
                ResourceByArea[area as keyof IResourceByArea].bonus.partial
            }% RUSH на слоты  ${slots},   по факту осадков добавить +${
                ResourceByArea[area as keyof IResourceByArea].bonus.rest
            }% BW.`
            const slotsStr = `Расширить все слоты ${slots} на ${
                ResourceByArea[area as keyof IResourceByArea].slots.medium
            }%`
            setBonusSentence(bonusStr)
            setSlotsSentence(slotsStr)
        }
    })
    const prepStr = `Вероятность осадков на слоты ${slots}: ${precipitation}`

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
                        color={Colors.violet}
                    >
                        {city}
                    </Title>
                </a>
                <div>{responsibleManagerTelegramNick}</div>
                <div>{prepStr}</div>
                <div>{slotsSentence}</div>
                <div>{bonusSentence}</div>
            </div>
            <div></div>
        </Flex>
    )
}
export { OnionPrecipitationCard }
