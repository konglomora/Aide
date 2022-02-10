import { Theme } from 'components/themes'
import { FC } from 'react'
import { AideColors, GlovoColors } from '.'
import Flex from './Flex'
import Title from './Title'

interface IStyledReportTitleWrapper {
    titleText?: string
    theme: Theme
}

const TitleWrapper: FC<IStyledReportTitleWrapper> = ({ titleText, theme }) => {
    const border = `4px solid ${
        theme === Theme.aide ? AideColors.white : GlovoColors.darkGrey
    }`
    return (
        <Flex
            wrap={'wrap'}
            border={border}
            justify={'center'}
            align={'center'}
            padding={'10px'}
            bRadius={'10px'}
            bFilter={'blur(2px)'}
            margin={'10px 0px'}
        >
            <Title margin={'10px 0px'} fWeight={'600'} width="100%">
                {titleText}
            </Title>
        </Flex>
    )
}

export default TitleWrapper
