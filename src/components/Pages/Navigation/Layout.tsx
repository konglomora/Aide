import { Outlet, useNavigate } from 'react-router-dom'
import StyledNavLink from '../../StyledComponents/StyledLink'
import { useEffect } from 'react'
import { Flex } from '../../StyledComponents/Flex'
import { useAuth } from '../../../hooks/use-auth'
import { removeUser } from '../../../store/slices/userSlice'
import Button from '../../StyledComponents/Button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { RootState } from 'store'
import { Roles } from '../Auth/helpers'

export const stylesForStyledLink = {
    width: '90%',
    height: '3em',
    radius: '15px',
    text_align: 'center',
}

const Layout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { isAuth } = useAuth()

    useEffect(() => {
        isAuth ? navigate('/') : navigate('login')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth])

    const userRole = useAppSelector((state: RootState) => state.user.role)
    const userIsAdmin = userRole === Roles.admin

    const handleLogout = () => {
        dispatch(removeUser())
    }
    return (
        <>
            <Flex
                width={'7em'}
                bColor={'rgb(37,37,38)'}
                padding={'1em 2em'}
                rBorder={'2px solid white'}
                direction={'column'}
                position="fixed"
                zIndex="999"
            >
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/'}
                    text={'🏠 Home'}
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
                    to={'/onions'}
                    text={'🌃 Onions'}
                />
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/reports'}
                    text={'📰 Reports '}
                />
                <Button alignSelf="end" margin="10% 0" onClick={handleLogout}>
                    Log out
                </Button>
            </Flex>

            <Outlet />
        </>
    )
}

export default Layout
