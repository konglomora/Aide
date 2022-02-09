import { FC, useState } from 'react'
import {
    Flex,
    Icon,
    Input,
    Title,
    Button,
    AideColors,
    GlovoColors,
} from 'components/styled'
import LOCK_ICON from 'assets/aide/icons/padlock.svg'
import LIGHTHOUSE_IMG from 'assets/glovo/img/lighthouse.png'

import { useAppSelector } from 'hooks'
import { Theme } from 'components/themes'

export interface FormProps {
    title: string
    handleClick: (email: string, pass: string) => void
}

const Form: FC<FormProps> = (props) => {
    const { title, handleClick } = props
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const styleForContainer = {
        width: '100%',
        height: '100vh',
        justify: 'center',
        align: 'center',
        bRadius: '10px',
        bFilter: 'blur(10px)',
    }
    const stylesForInput = {
        width: '20em',
        padding: '10px',
    }

    const theme = useAppSelector((state) => state.theme.theme)
    const icon =
        theme === Theme.aide ? (
            <Icon
                padding="25px"
                background={AideColors.violet}
                radius="50%"
                width="50px"
                height="50px"
                border="5px solid black"
                src={LOCK_ICON}
            />
        ) : (
            <Icon
                padding="15px 35px"
                background={GlovoColors.darkGrey}
                radius="90%"
                width="40px"
                height="85px"
                border="5px solid white"
                src={LIGHTHOUSE_IMG}
            />
        )

    return (
        <Flex {...styleForContainer}>
            <Flex
                align="center"
                direction="column"
                width="40%"
                mHeight="25%"
                height="35%"
            >
                {icon}
                <Title margin="20px 0 0 0" height="1.5 em" fWeight="700">
                    {title}
                </Title>
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

export default Form
