import { AideColors, Flex, GlovoColors } from 'components/styled'
import { Theme } from 'components/themes'
import { useAppSelector } from 'hooks'
import { ThemeChanger } from 'pages/themes'
import { FC, ReactNode } from 'react'

export interface IPropsNavbar {
    children: ReactNode
}

const Navbar: FC<IPropsNavbar> = (props) => {
    const theme = useAppSelector((state) => state.theme.theme)

    const { children } = props
    const border = `4px solid ${
        theme === Theme.aide ? AideColors.white : GlovoColors.darkGrey
    }`
    const bColor =
        theme === Theme.aide ? AideColors.lightBlack : GlovoColors.white
    return (
        <Flex
            justify={'space-evenly'}
            align="center"
            bBorder={border}
            padding={'1em 0px 1em'}
            bColor={bColor}
            height="3%"
            width="100%"
            position="fixed"
            zIndex="3"
            margin="0 0 0 4em"
        >
            {children}
            <ThemeChanger />
        </Flex>
    )
}

export default Navbar
