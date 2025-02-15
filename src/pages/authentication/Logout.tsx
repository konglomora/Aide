import { AideColors, Flex, GlovoColors, TextContent } from 'components/styled'
import { Theme } from 'components/themes'
import { capitalizeFirstLetter } from 'helpers/strings'
import { useAppDispatch, useAppSelector, useAuth } from 'hooks'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { removeUser } from 'store/slices/user/userSlice'
import { FiLogOut } from 'react-icons/fi'

const Logout = () => {
    const location = useLocation()
    const { isAuth } = useAuth()
    const [userName, setUserName] = useState<string>('')
    const email = useAppSelector((state) => state.user.email)
    const theme = useAppSelector((state) => state.theme.theme)
    const dispatch = useAppDispatch()
    useEffect(() => {
        console.log('Sidebar location.state?.from', location.state)

        if (email) {
            const emailName = email.split('.')[0]
            setUserName(capitalizeFirstLetter(emailName))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth])

    const handleLogout = () => {
        dispatch(removeUser())
    }
    const flexHoverColor =
        theme === Theme.aide ? AideColors.violet : GlovoColors.yellow
    const logoutBlockContentColor =
        theme === Theme.aide ? AideColors.white : GlovoColors.darkGrey

    return (
        <Flex
            hoverable={true}
            hoverColor={flexHoverColor}
            cursor="pointer"
            height="5em"
            mHeight={'5em'}
            onClick={handleLogout}
            margin="auto 0 0 0"
            justify="center"
            align="center"
            tBorder={`4px solid ${logoutBlockContentColor}`}
            bBorder={`4px solid ${logoutBlockContentColor}`}
            width="100%"
        >
            <Flex width="30%" justify="center" align="center">
                <FiLogOut size={35} stroke={logoutBlockContentColor} />
            </Flex>
            <Flex direction="column" justify="space-around" align="stretch">
                <TextContent
                    height="25%"
                    textAlign="center"
                    fSize="24px"
                    color={logoutBlockContentColor}
                >
                    Logout
                </TextContent>

                <TextContent
                    fWeight={600}
                    height="25%"
                    textAlign="center"
                    fSize="18px"
                    color={logoutBlockContentColor}
                >
                    {userName}
                </TextContent>
            </Flex>
        </Flex>
    )
}
export default Logout
