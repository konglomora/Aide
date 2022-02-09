import { Flex, StyledNavLink, AideColors, GlovoColors } from 'components/styled'
import { RootState } from 'store'
import { useAppSelector } from 'hooks'

import { Roles } from 'pages/authentication/userRoles'
import { Theme } from 'components/themes'
import Logout from '../authentication/Logout'
import { ThemeChanger } from 'pages/themes'

export const stylesForStyledLink = {
    width: '95%',
    height: '3em',
    radius: '15px',
    text_align: 'left',
}

const Sidebar = () => {
    const theme = useAppSelector((state) => state.theme.theme)

    const userIsAdmin = useAppSelector(
        (state: RootState) => state.user.role === Roles.admin
    )

    const adminNavLinks = userIsAdmin && (
        <>
            <StyledNavLink
                {...stylesForStyledLink}
                to={'/experiments'}
                text={'🔬 Experiments '}
            />
        </>
    )

    return (
        <Flex
            width={'13em'}
            bColor={
                theme === Theme.aide ? AideColors.lightBlack : GlovoColors.white
            }
            rBorder={`3px solid ${
                theme === Theme.aide ? AideColors.white : GlovoColors.darkGrey
            }`}
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
                padding="1em 0 0 2em"
            >
                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/onions'}
                    text={'🌃 Onions'}
                />

                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/weather'}
                    text={'⛈ Weather'}
                />

                <StyledNavLink
                    {...stylesForStyledLink}
                    to={'/saturation'}
                    text={'📰 Saturation '}
                />
                {adminNavLinks}
            </Flex>

            <Logout />
        </Flex>
    )
}

export default Sidebar
