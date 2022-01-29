import { useAppSelector } from 'store/hooks'
import { Flex } from 'components/styled'
import welcomeImage from 'assets/gif/madara-naruto.gif'

const Homepage = () => {
    const userName = useAppSelector((state) => state.user.name)

    return (
        <Flex
            align="center"
            justify="start"
            direction="column"
            width="100%"
            padding="0 0 0 10em"
            mHeight="100vh"
            bFilter={'blur(2px)'}
        >
            <h1> 🙃 Welcome, {userName} 🙂</h1>
            <img
                src={welcomeImage}
                alt="Welcome"
                style={{ borderRadius: '30px', width: '50%' }}
            />
        </Flex>
    )
}

export default Homepage
