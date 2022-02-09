import { AideColors, Button, Flex, GlovoColors } from 'components/styled'
import { Theme } from 'components/themes'
import { useAppDispatch, useAppSelector } from 'hooks'
import { ThemeChanger } from 'pages/themes'
import { FC, ReactNode } from 'react'
import { changeTheme } from 'store/slices/theme/themeSlice'

export interface IPropsNavbar {
    children: ReactNode
}

const Navbar: FC<IPropsNavbar> = (props) => {
    const theme = useAppSelector((state) => state.theme.theme)

    const { children } = props
    return (
        <Flex
            justify={'space-evenly'}
            align="center"
            bBorder={`3px solid ${
                theme === Theme.aide ? AideColors.white : GlovoColors.darkGrey
            }`}
            padding={'1em 0px 1em'}
            bColor={
                theme === Theme.aide ? AideColors.lightBlack : GlovoColors.white
            }
            height="3%"
            mHeight="3%"
            top="0"
            left="10em"
            width="100%"
            position="fixed"
            zIndex="3"
        >
            {children}
            <ThemeChanger />
        </Flex>
    )
}

export default Navbar
