import { Flex } from '../../StyledComponents/Flex'

const Homepage = () => {
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
            <h1> 🙂 Welcome 🤖</h1>

            <img
                src="https://i.gifer.com/Skj2.gif"
                alt="Bender"
                style={{ borderRadius: '20px' }}
            />
        </Flex>
    )
}

export default Homepage
