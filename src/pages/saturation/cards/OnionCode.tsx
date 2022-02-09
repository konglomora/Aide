import { FC } from 'react'
import { Flex, TextContent, AideColors } from 'components/styled'

interface PropsOnionCode {
    code: string
    onClick: (e: React.ChangeEvent<any>) => void
}

const OnionCode: FC<PropsOnionCode> = (props) => {
    const { code, onClick } = props
    const backgroundColor = 'transparent'
    const color = 'white'
    const border = '3px solid white'

    return (
        <Flex
            cursor={'pointer'}
            border={border}
            width={'3em'}
            padding={'3px'}
            bRadius={'5px'}
            justify={'space-around'}
            margin={'5px'}
            bColor={backgroundColor}
            onClick={(e: React.ChangeEvent<any>) => onClick(e)}
            hoverable={true}
            hoverColor={AideColors.black}
        >
            <TextContent fWeight={400} color={color} textAlign={'center'}>
                {`${code}`}
            </TextContent>
        </Flex>
    )
}

export default OnionCode
