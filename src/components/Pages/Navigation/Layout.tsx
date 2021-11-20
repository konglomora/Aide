import { Outlet, useNavigate } from 'react-router-dom'
import StyledNavLink from '../../StyledComponents/StyledLink'
import { useEffect } from 'react'
import { Flex } from '../../StyledComponents/Flex'
import { useAuth } from '../../../hooks/use-auth'
import { removeUser } from '../../../store/slices/userSlice'
import Button from '../../StyledComponents/Button'
import { useAppDispatch } from '../../../store/hooks'

export const stylesForStyledLink = {
    width: '90%',
    height: '3em',
    radius: '15px',
    text_align: 'center',
}

const Layout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { isAuth, email } = useAuth()

    useEffect(() => {
        isAuth ? navigate('/') : navigate('login')
    }, [isAuth])

    const handleLogout = () => {
        dispatch(removeUser())
    }
    return (
        <>
            <Flex
                width={'em'}
                bColor={'rgb(37,37,38)'}
                padding={'1em 2em'}
                rBorder={'2px solid white'}
                align={'center'}
                direction={'column'}
                position="fixed"
                zIndex="999"
            >
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/'}
                    text={'Home 🏠'}
                />
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/charts'}
                    text={'Charts 📈'}
                />
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/weather'}
                    text={'Weather ⛈'}
                />
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/reports'}
                    text={'Reports 📰'}
                />

                <Button margin="10% 0" onClick={handleLogout}>
                    Log out
                </Button>
            </Flex>

            <Outlet />
        </>
    )
}

export default Layout
