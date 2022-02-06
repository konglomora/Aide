// import { REACT_APP_ONION_SLOTS_LINK } from 'api/env'
import dayjs from 'dayjs'
import { Colors, Flex, Title } from 'components/styled'
import { FC } from 'react'
import { onionService } from 'services'
import { ISaturatedOnionAnalysis } from 'store/helpers/reports/types'

export interface IOnionSaturationCardProps {
    userIsAdmin: boolean
}

const OnionSaturationCard: FC<
    ISaturatedOnionAnalysis & IOnionSaturationCardProps
> = (props) => {
    const {
        city,
        saturation,
        difference,
        forAutoReport,
        reason_saturation,
        area,
        level_saturation,
        slotFilledStr,
        block_min,
        mp_mode_min,
    } = props
    const { REACT_APP_ONION_SLOTS_LINK } = process.env
    const hadMPMode =
        mp_mode_min > 0 && onionService.onionHasMPModeSetting(city)
    const hadBlock = block_min > 0 && onionService.onionHasBlockSetting(city)

    const todayDate: string = dayjs().format('YYYY-MM-DD')
    const onionSlotsLink: string = `${REACT_APP_ONION_SLOTS_LINK}${city}/${todayDate}`

    return (
        <Flex
            border={'3px solid white'}
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
                        color={Colors.violet}
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
                {(hadMPMode || hadBlock) && (
                    <div>
                        {hadMPMode && <div>MP Mode: {mp_mode_min} mins</div>}
                        {hadBlock && <div>Block: {block_min} mins</div>}
                    </div>
                )}
                <div>
                    <span>{area}</span>
                    <span>{level_saturation}</span>
                </div>
            </div>
            <div> </div>
        </Flex>
    )
}

export default OnionSaturationCard
