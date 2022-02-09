import { Flex, TextContent } from 'components/styled'
import { FC } from 'react'
import { Theme } from 'react-toastify'
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
    const reasonAnalysis =
        analysis.length > 0 ? (
            <>
                <div> </div>
                <Flex
                    wrap={'wrap'}
                    border={'4px solid white'}
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
