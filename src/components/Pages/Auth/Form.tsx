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
        direction: 'row',
        width: '30%',
        border: '2px solid white',
        justify: 'space-evenly',
        align: 'stretch',
        padding: '10px',
        bRadius: '10px',
        bFilter: 'blur(2px)',
        margin: '5% auto',
    }
    const stylesForInput = {
        width: '80%',
        padding: '8px',
    }
    return (
        <Flex {...styleForContainer}>
            <Flex
                width="80%"
                align="center"
                margin="15%  auto"
                direction="column"
            >
                <Icon
                    padding="25px"
                    background="rgb(186, 143, 255)"
                    radius="50%"
                    width="13%"
                    src={LOCK_ICON}
                />
                <Title margin="20px 0 0 0">{title}</Title>
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
                    height="110px"
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
                    // disabled={!formValid}
                    onClick={() => {
                        handleClick(email, pass)
                    }}
                    width="50%"
                >
                    {title}
                </Button>
            </Flex>
        </Flex>
    )
}
