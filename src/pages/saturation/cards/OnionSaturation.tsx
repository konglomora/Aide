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

const OnionSaturationCard: FC<ISaturatedOnionAnalysis> = (props) => {
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
    const theme = useAppSelector((state) => state.theme.theme)
    const cardBackColor =
        theme === Theme.aide ? AideColors.blur : GlovoColors.white
    const border =
        theme === Theme.aide
            ? `4px solid ${AideColors.white}`
            : `4px solid ${GlovoColors.darkGrey}`
    const linkColor =
        theme === Theme.aide ? AideColors.violet : GlovoColors.yellow
    return (
        <Flex
            border={border}
            bRadius={'10px'}
            padding={'15px'}
            margin={'10px'}
            width={'30em'}
            bColor={cardBackColor}
        >
            <TextBlock>
                <a
                    href={onionSlotsLink}
                    target={'blank'}
                    style={{ textDecoration: 'none' }}
                >
                    <Title fWeight={'600'} fSize={'1.5em'} color={linkColor}>
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
