import { FC, useEffect, useState } from 'react'
import Button from '../../StyledComponents/Button'
import { Flex } from '../../StyledComponents/Flex'
import { Icon } from '../../StyledComponents/Icon'
import { Input } from '../../StyledComponents/Input'
import TextContent from '../../StyledComponents/TextContent'
import { Title } from '../../StyledComponents/Title'
import LOCK_ICON from '../../../assets/icons/padlock.svg'
import { useAuth } from '../../../hooks/use-auth'
import { useNavigate } from 'react-router-dom'

export interface FormProps {
    title: string
    handleClick: (email: string, pass: string) => void
    displaySignInError: string
}

export const Form: FC<FormProps> = (props) => {
    const { isAuth } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuth) navigate('/')
    })

    const { title, handleClick, displaySignInError } = props
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const styleForContainer = {
        width: '100%',
        height: '100vh',
        justify: 'center',
        align: 'center',
        bRadius: '10px',
        bFilter: 'blur(2px)',
    }
    const stylesForInput = {
        width: '20em',
        padding: '10px',
    }
    return (
        <Flex {...styleForContainer}>
            <Flex
                align="center"
                direction="column"
                // background="plum"
                width="40%"
                mHeight="25%"
                height="35%"
            >
                <Icon
                    padding="25px"
                    background="rgb(186, 143, 255)"
                    radius="50%"
                    width="50px"
                    height="50px"
                    border="5px solid black"
                    src={LOCK_ICON}
                />
                <Title margin="20px 0 0 0" height="1.5 em">
                    {title}
                </Title>
                <TextContent
                    display={displaySignInError}
                    margin="10px auto"
                    textAlign="center"
                    color="red"
                    fSize="1.4em"
                >
                    🧐 Incorrect email or password 🧐
                </TextContent>
                <Flex
                    margin="14px"
                    mHeight="7em"
                    height="12em"
                    justify="space-around"
                    align="center"
                    direction="column"
                >
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        placeholder="Email Address *"
                        {...stylesForInput}
                    />
                    <Input
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                        type="password"
                        placeholder="Password *"
                        {...stylesForInput}
                    />
                </Flex>

                <Button
                    onClick={() => {
                        handleClick(email, pass)
                    }}
                    width="7em"
                >
                    {title}
                </Button>
            </Flex>
        </Flex>
    )
}
