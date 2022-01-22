import Button from 'components/StyledComponents/Button'
import { Flex } from 'components/StyledComponents/Flex'
import StyledNavLink from 'components/StyledComponents/StyledLink'
import { Colors } from 'components/StyledComponents/colors'
import { useAuth } from 'hooks/use-auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'store'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { removeUser } from 'store/slices/userSlice'
import { Roles } from '../Auth/helpers'
import { Icon } from 'components/StyledComponents/Icon'
import LogOutIcon from '../../../assets/icons/log-out.svg'
import TextContent from 'components/StyledComponents/TextContent'
import { capitalizeFirstLetter } from 'helpers/strings'
export const stylesForStyledLink = {
    width: '95%',
    height: '3em',
    radius: '15px',
    text_align: 'left',
}

export default function Sidebar() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { isAuth } = useAuth()
    const [userName, setUserName] = useState<string>('')
    const email: string | null = useAppSelector((state) => state.user.email)

    useEffect(() => {
        isAuth ? navigate('/') : navigate('login')
        if (email) {
            const emailName = email.split('.')[0]
            setUserName(capitalizeFirstLetter(emailName))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth])

    const userIsAdmin = useAppSelector(
        (state: RootState) => state.user.role === Roles.admin
    )

    const handleLogout = () => {
        dispatch(removeUser())
    }
    return (
        <Flex
            width={'13em'}
            bColor={Colors.lightBlack}
            rBorder={'2px solid white'}
            direction={'column'}
            position="fixed"
            align="center"
            zIndex="999"
        >
            <Flex
                justify="center"
                align="center"
                width="11em"
                direction={'column'}
                mHeight="10em"
                height="15em"
                padding="0 0 0 2em"
            >
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/'}
                    text={'🏠 Home'}
                />
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/onions'}
                    text={'🌃 Onions'}
                />
                {userIsAdmin && (
                    <>
                        <StyledNavLink
                            {...stylesForStyledLink}
                            to={'/weather'}
                            text={'⛈ Weather'}
                        />
                    </>
                )}
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/saturation'}
                    text={'📰 Saturation '}
                />
            </Flex>
            <Flex
                hoverable={true}
                hoverColor={Colors.orange}
                cursor="pointer"
                height="5em"
                mHeight={'5em'}
                onClick={handleLogout}
                margin="auto 0 0 0"
                justify="center"
                align="center"
                tBorder="2px solid white"
            >
                <Icon
                    padding="0 0 0 2em"
                    width={'35px'}
                    height={'35px'}
                    src={LogOutIcon}
                />
                <Flex direction="column" justify="space-around" align="stretch">
                    <TextContent height="25%" textAlign="center" fSize="24px">
                        Logout
                    </TextContent>
                    <TextContent
                        fWeight={600}
                        height="25%"
                        textAlign="center"
                        fSize="18px"
                    >
                        {userName}
                    </TextContent>
                </Flex>
            </Flex>
        </Flex>
    )
}
