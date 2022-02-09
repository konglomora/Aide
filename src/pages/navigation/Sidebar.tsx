import { GoGraph } from 'react-icons/go'
import { BsCloudLightningRainFill } from 'react-icons/bs'
import { FaCity } from 'react-icons/fa'
import { AiFillExperiment } from 'react-icons/ai'
import { Flex, StyledNavLink, AideColors, GlovoColors } from 'components/styled'
import { RootState } from 'store'
import { useAppSelector } from 'hooks'

import { Roles } from 'pages/authentication/userRoles'
import { Theme } from 'components/themes'
import Logout from '../authentication/Logout'
import { PropsFlex } from 'components/styled/Flex'

export const stylesForStyledLink = {
    height: '1em',
}

const containerLinkStyle: PropsFlex = {
    align: 'center',
    width: '10em',
    padding: '1.2em 0 0 0',
}

const iconSize = 30

const Sidebar = () => {
    const theme = useAppSelector((state) => state.theme.theme)

    const userIsAdmin = useAppSelector(
        (state: RootState) => state.user.role === Roles.admin
    )
    const iconColor =
        theme === Theme.aide ? AideColors.white : GlovoColors.darkGrey
    const adminNavLinks = userIsAdmin && (
        <Flex {...containerLinkStyle}>
            <Flex margin="0 .5em 0 0">
                <AiFillExperiment size={iconSize} fill={iconColor} />
            </Flex>

            <StyledNavLink
                {...stylesForStyledLink}
                to={'/experiments'}
                text={'Experiments '}
            />
        </Flex>
    )

    return (
        <Flex
            width={'12em'}
            height="100%"
            bColor={
                theme === Theme.aide ? AideColors.lightBlack : GlovoColors.white
            }
            rBorder={`4px solid ${
                theme === Theme.aide ? AideColors.white : GlovoColors.darkGrey
            }`}
            direction={'column'}
            position="fixed"
            align="space-around"
            zIndex="999"
        >
            <Flex
                justify="center"
                align="center"
                // width="11em"
                direction={'column'}
                mHeight="10em"
                // padding="1em 0 0 2em"
            >
                <Flex {...containerLinkStyle}>
                    <Flex margin="0 .5em 0 0">
                        <FaCity size={iconSize} fill={iconColor} />
                    </Flex>

                    <StyledNavLink
                        {...stylesForStyledLink}
                        to={'/onions'}
                        text={'Onions'}
                    />
                </Flex>

                <Flex {...containerLinkStyle}>
                    <Flex margin="0 .5em 0 0">
                        <BsCloudLightningRainFill
                            size={iconSize}
                            fill={iconColor}
                        />
                    </Flex>
                    <StyledNavLink
                        {...stylesForStyledLink}
                        to={'/weather'}
                        text={'Weather'}
                    />
                </Flex>

                <Flex {...containerLinkStyle}>
                    <Flex margin="0 .5em 0 0">
                        <GoGraph size={iconSize} fill={iconColor} />
                    </Flex>
                    <StyledNavLink
                        {...stylesForStyledLink}
                        to={'/saturation'}
                        text={'Saturation '}
                    />
                </Flex>
                {adminNavLinks}
            </Flex>
            <Logout />
        </Flex>
    )
}

export default Sidebar
