import Button from 'components/StyledComponents/Button'
import { Flex } from 'components/StyledComponents/Flex'
import StyledNavLink from 'components/StyledComponents/StyledLink'
import { Colors } from 'helpers/colors'
import { useAuth } from 'hooks/use-auth'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'store'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { removeUser } from 'store/slices/userSlice'
import { Roles } from '../Auth/helpers'

export const stylesForStyledLink = {
    width: '90%',
    height: '3em',
    radius: '15px',
    text_align: 'center',
}

export default function Sidebar() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { isAuth } = useAuth()

    useEffect(() => {
        isAuth ? navigate('/') : navigate('login')
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
            width={'7em'}
            bColor={Colors.lightBlack}
            padding={'1em 2em'}
            rBorder={'2px solid white'}
            direction={'column'}
            position="fixed"
            zIndex="999"
        >
            <StyledNavLink {...stylesForStyledLink} to={'/'} text={'🏠 Home'} />
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
                to={'/reports'}
                text={'📰 Reports '}
            />
            <Button margin="auto 0 40% 0" onClick={handleLogout}>
                Log out
            </Button>
        </Flex>
    )
}
