import dayjs from 'dayjs'
import {
    AideColors,
    Flex,
    GlovoColors,
    TextBlock,
    TextContent,
    Title,
} from 'components/styled'
import { FC } from 'react'
import { onionService } from 'services'
import { ISaturatedOnionAnalysis } from 'store/slices/saturation/types'
import { useAppSelector } from 'hooks'
import { Theme } from 'components/themes'

export interface IOnionSaturationCardProps {
    userIsAdmin: boolean
}

const OnionSaturationCard: FC<
    ISaturatedOnionAnalysis & IOnionSaturationCardProps
> = (props) => {
    const theme = useAppSelector((state) => state.theme.theme)
    const {
        city,
        saturation,
        forAutoReport,
        reason_saturation,
        area,
        diffStr,
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

    const cardBackColor =
        theme === Theme.aide ? AideColors.blur : GlovoColors.white
    return (
        <Flex
            border={'3px solid white'}
            bRadius={'10px'}
            padding={'15px'}
            margin={'10px'}
            width={'30em'}
            mHeight={'100%'}
            height={'100%'}
            bColor={cardBackColor}
        >
            <TextBlock>
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
                <TextBlock>
                    {saturation.map(
                        (saturationAtSlotData: string, id: number) => (
                            <div key={id}>{saturationAtSlotData}</div>
                        )
                    )}
                </TextBlock>
                <TextBlock>{diffStr}</TextBlock>
                <TextBlock>Slot filling: {slotFilledStr}</TextBlock>
                {(hadMPMode || hadBlock) && (
                    <div>
                        {hadMPMode && (
                            <TextBlock>MP Mode: {mp_mode_min} mins</TextBlock>
                        )}
                        {hadBlock && (
                            <TextBlock>Block: {block_min} mins</TextBlock>
                        )}
                    </div>
                )}
                {forAutoReport ? (
                    ''
                ) : (
                    <TextBlock>{reason_saturation}</TextBlock>
                )}
                <TextBlock>
                    <TextContent>{area}</TextContent>
                    <TextContent>{level_saturation}</TextContent>
                </TextBlock>
            </TextBlock>
            <div> </div>
        </Flex>
    )
}

export default OnionSaturationCard
