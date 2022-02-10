import { AideColors, Flex, GlovoColors, TextContent } from 'components/styled'
import { Theme } from 'components/themes'
import { FC } from 'react'
import { ISaturatedOnionAnalysis } from 'store/slices/saturation/types'
import OnionSaturationCard from './OnionSaturation'

interface ISaturationReasonAnalysis {
    analysis: ISaturatedOnionAnalysis[]
    reasonTitle: string
    theme?: Theme
}

export const SaturationReasonAnalysis: FC<ISaturationReasonAnalysis> = (
    props
) => {
    const { analysis, reasonTitle, theme } = props

    const border =
        theme === Theme.aide
            ? `4px solid ${AideColors.white}`
            : `4px solid ${GlovoColors.darkGrey}`
    const reasonAnalysis =
        analysis.length > 0 ? (
            <>
                <div> </div>
                <Flex
                    wrap={'wrap'}
                    border={border}
                    justify={'space-evenly'}
                    align={'center'}
                    padding={'10px'}
                    bRadius={'10px'}
                    bFilter={'blur(2px)'}
                    margin={'10px 0px'}
                >
                    <TextContent fSize={'1.3em'} fWeight={'800'}>
                        {reasonTitle}
                    </TextContent>
                    <div> </div>
                    {analysis.map((onionReport, id) => (
                        <OnionSaturationCard {...onionReport} key={id} />
                    ))}
                </Flex>
            </>
        ) : (
            <></>
        )
    return reasonAnalysis
}
