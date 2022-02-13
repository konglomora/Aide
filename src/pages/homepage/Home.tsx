import { useAppSelector } from 'hooks'
import { Flex, TextContent } from 'components/styled'
import { ThemeGif } from 'components/themes'

const Homepage = () => {
    const userName = useAppSelector((state) => state.user.name)
    const theme = useAppSelector((state) => state.theme.theme)

    return (
        <Flex
            align="center"
            justify="start"
            direction="column"
            width="100%"
            margin={'20em 0 auto 12em'}
        >
            <TextContent fWeight={700} fSize={'3em'}>
                {' '}
                🙃 Welcome, {userName} 🙂
            </TextContent>
            <img
                src={ThemeGif[theme].greeting.gif}
                alt="Welcome"
                style={{ borderRadius: '30px', width: '16em' }}
            />
        </Flex>
    )
}

export default Homepage
