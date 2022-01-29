import { Flex, TextContent } from 'components/styled'
import { FC } from 'react'
import OnionCode from 'pagess/saturation/cards/OnionCode'

interface IAreaCodesCard {
    cardTitle: string
    codes: string[]
    onClick: (e: React.ChangeEvent<HTMLDivElement>) => void
}

const AreaCodesCard: FC<IAreaCodesCard> = (props) => {
    const { cardTitle, codes, onClick } = props
    return (
        <Flex
            direction={'column'}
            width={`80%`}
            bRadius={'5px'}
            margin={'8px auto'}
            padding={'10px'}
        >
            <TextContent width={' '} textAlign={'center'}>
                {cardTitle}
            </TextContent>
            <Flex justify={'center'} wrap={'wrap'}>
                {codes.map((code: string) => (
                    <OnionCode key={code} code={code} onClick={onClick} />
                ))}
            </Flex>
        </Flex>
    )
}

export default AreaCodesCard
