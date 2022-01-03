import { FC } from 'react'
import { Flex } from 'components/StyledComponents/Flex'
import { Title } from 'components/StyledComponents/Title'

interface PropsOnionSlotsCard {
    code: string
    link: string
}

const OnionSlotsCard: FC<PropsOnionSlotsCard> = (props) => {
    const { code, link } = props
    const backgroundColor = 'transparent'
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
        >
            <a
                href={link}
                target={'_blank'}
                style={{ textDecoration: 'none' }}
                rel="noreferrer"
            >
                <Title
                    fWeight={'600'}
                    fSize={'1.5em'}
                    color="rgb(186, 143, 255)"
                >
                    {code}
                </Title>
            </a>
        </Flex>
    )
}

export default OnionSlotsCard
