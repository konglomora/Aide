import Flex from '../../StyledComponents/Flex'
import { Outlet, useNavigate } from 'react-router-dom'
import StyledNavLink from '../../StyledComponents/StyledLink'
import { useEffect } from 'react'

export const stylesForStyledLink = {
    width: '90%',
    height: '3em',
    radius: '15px',
    text_align: 'center',
}

const Layout = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('login')
    }, [])
    return (
        <>
            <Flex
                height={' '}
                mHeight={'100vh'}
                width={'10%'}
                bColor={'rgb(37,37,38)'}
                padding={' 1em 1.1em'}
                rBorder={'2px solid white'}
                align={'center'}
                direction={'column'}
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
            </Flex>
            <Flex width="90%">
                <Outlet />
            </Flex>
        </>
    )
}

export default Layout
