import { FC } from 'react'
import { Flex, TextContent, AideColors, GlovoColors } from 'components/styled'
import { useAppSelector } from 'hooks'
import { Theme } from 'components/themes'

interface PropsOnionCode {
    code: string
    onClick: (e: React.ChangeEvent<any>) => void
}

const OnionCode: FC<PropsOnionCode> = (props) => {
    const { code, onClick } = props
    const theme = useAppSelector((state) => state.theme.theme)
    const cardBackColor =
        theme === Theme.aide ? AideColors.smoothBlack : GlovoColors.darkGrey
    const hoverColor =
        theme === Theme.aide ? AideColors.white : GlovoColors.yellow
    const color = theme === Theme.aide ? AideColors.violet : GlovoColors.white
    const border = `4px solid ${hoverColor}`

    return (
        <Flex
            cursor={'pointer'}
            border={border}
            width={'3em'}
            padding={'4px'}
            bRadius={'5px'}
            justify={'space-around'}
            margin={'5px'}
            bColor={cardBackColor}
            onClick={(e: React.ChangeEvent<any>) => onClick(e)}
            hoverable={true}
            hoverColor={hoverColor}
        >
            <TextContent fWeight={600} color={color} textAlign={'center'}>
                {`${code}`}
            </TextContent>
        </Flex>
    )
}

export default OnionCode
