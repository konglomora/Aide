import { Flex } from '../../../../StyledComponents/Flex'
import TextContent from '../../../../StyledComponents/TextContent'

const OnionCode = ({ code, onClick, value }) => {
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
            onClick={(e) => onClick(e)}
        >
            <TextContent fWeight={400} color={color} textAlign={'center'}>
                {`${code}`}
            </TextContent>
        </Flex>
    )
}

export default OnionCode
