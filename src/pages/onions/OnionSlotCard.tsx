import { FC } from 'react'
import { REACT_APP_ONION_SLOTS_LINK } from 'api/env'
import { Flex, Title, Colors } from 'components/styled'

interface PropsOnionSlotsCard {
    code: string
    date: string
}

const OnionSlotsCard: FC<PropsOnionSlotsCard> = (props) => {
    const { code, date } = props
    const transparent = 'transparent'
    const border = '3px solid white'

    return (
        <Flex
            cursor={'pointer'}
            border={border}
            width={'4em'}
            padding={'3px'}
            bRadius={'5px'}
            justify={'space-around'}
            margin={'5px'}
            bColor={transparent}
            hoverable={true}
            hoverColor=""
        >
            <a
                href={`${REACT_APP_ONION_SLOTS_LINK}${code}/${date}`}
                target={'_blank'}
                style={{ textDecoration: 'none' }}
                rel="noreferrer"
            >
                <Title fWeight={'600'} fSize={'1.5em'} color={Colors.violet}>
                    {code}
                </Title>
            </a>
        </Flex>
    )
}

export default OnionSlotsCard
