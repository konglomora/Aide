import { TextBlock } from 'components/styled'
import { DataCardWrapper } from 'components/styled/DataCardWrapper'
import { SaturationModeCardWrapper } from 'components/styled/SaturationModeCardWrapper'
import { useAppSelector } from 'hooks'
import { ReactNode, useEffect, useState } from 'react'
import { SaturationBotModes } from 'store/slices/sheets/modesSlice'

const SaturationModes = () => {
    const { onionsByMode } = useAppSelector((state) => state.modes)
    const { LIGHT, HEAVY, EXTREME } = onionsByMode

    const [allOnionsOnNormalMode, setAllOnionsOnNormalMode] =
        useState<boolean>(false)

    const [modeCards, setModeCards] = useState<ReactNode[]>([])

    useEffect(() => {
        if ([...LIGHT, ...HEAVY, ...EXTREME].length === 0) {
            setAllOnionsOnNormalMode(true)
        } else {
            const modes = Object.keys(onionsByMode) as SaturationBotModes[]
            const cards = modes.map<ReactNode | null>((mode) => {
                const onions =
                    mode !== SaturationBotModes.NORMAL ? onionsByMode[mode] : []

                if (onions.length > 0) {
                    return (
                        <DataCardWrapper width="100%">
                            <TextBlock>
                                {' '}
                                {onions.join('/')} - {mode}
                            </TextBlock>
                        </DataCardWrapper>
                    )
                }
                return <></>
            })
            setModeCards(cards)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SaturationModeCardWrapper>
            {allOnionsOnNormalMode ? (
                <TextBlock>All onions - NORMAL</TextBlock>
            ) : (
                <>{modeCards}</>
            )}
        </SaturationModeCardWrapper>
    )
}

export default SaturationModes
