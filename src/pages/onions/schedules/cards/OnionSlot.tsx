import { FC } from 'react'
import { Flex, Title } from 'components/styled'

interface PropsOnionSlotsCard {
    code: string
    date: string
    linkColor: string
    linkHoverColor: string
}

const OnionSlotsCard: FC<PropsOnionSlotsCard> = (props) => {
    const { code, date, linkColor, linkHoverColor } = props
    const transparent = 'transparent'
    const border = '4px solid white'
    const { REACT_APP_ONION_SLOTS_LINK } = process.env
    return (
        <Flex
            cursor={'pointer'}
            border={border}
            width={'4em'}
            padding={'4px'}
            bRadius={'5px'}
            justify={'space-around'}
            margin={'5px'}
            bColor={transparent}
            hoverable={true}
            hoverColor={linkHoverColor}
        >
            <a
                href={`${REACT_APP_ONION_SLOTS_LINK}${code}/${date}`}
                target={'_blank'}
                style={{ textDecoration: 'none' }}
                rel="noreferrer"
            >
                <Title fWeight={'600'} fSize={'1.5em'} color={linkColor}>
                    {code}
                </Title>
            </a>
        </Flex>
    )
}

export default OnionSlotsCard
