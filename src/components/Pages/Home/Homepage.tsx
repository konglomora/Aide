import { capitalizeFirstLetter } from 'helpers/strings'
import { useEffect, useState } from 'react'
import { useAppSelector } from 'store/hooks'
import { Flex } from '../../StyledComponents/Flex'

const Homepage = () => {
    const [userName, setUserName] = useState<string>('')
    const email: string | null = useAppSelector((state) => state.user.email)
    useEffect(() => {
        if (email) {
            const emailName = email.split('.')[0]
            setUserName(capitalizeFirstLetter(emailName))
        }
    }, [email])

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
                src="https://i.gifer.com/Skj2.gif"
                alt="Bender"
                style={{ borderRadius: '20px' }}
            />
        </Flex>
    )
}

export default Homepage
