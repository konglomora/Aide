import { REACT_APP_ONION_SLOTS_LINK } from 'axios/env'
import dayjs from 'dayjs'
import { FC } from 'react'
import { Flex } from '../../../../StyledComponents/Flex'
import { Title } from '../../../../StyledComponents/Title'

interface PropsOnionSaturationCard {
    city: string
    saturation: string[]
    difference: string
    forAutoReport: string
    reason_saturation: string
    area: string
    level_sat: string
    slotFilledStr: string
}

const OnionSaturationCard: FC<PropsOnionSaturationCard> = (props) => {
    const {
        city,
        saturation,
        difference,
        forAutoReport,
        reason_saturation,
        area,
        level_sat,
        slotFilledStr,
    } = props

    const todayDate: string = dayjs().format('YYYY-MM-DD')
    const SLOTS_LINK: string = REACT_APP_ONION_SLOTS_LINK
    const onionSlotsLink: string = `${SLOTS_LINK}${city}/${todayDate}`

    return (
        <Flex
            border={'2px solid white'}
            bRadius={'10px'}
            padding={'15px'}
            margin={'10px'}
            width={'30em'}
            mHeight={'100%'}
            height={'100%'}
            bColor={'rgb(24 25 26 / 78%);'}
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
                <div>
                    {saturation.map(
                        (saturationAtSlotData: string, id: number) => (
                            <div key={id}>{saturationAtSlotData}</div>
                        )
                    )}
                </div>
                <div>{difference}</div>
                {forAutoReport ? '' : <div>{reason_saturation}</div>}
                <div>{slotFilledStr}</div>
                <div>
                    <span>{area}</span>
                    <span>{level_sat}</span>
                </div>
            </div>
            <div> </div>
        </Flex>
    )
}

export default OnionSaturationCard
