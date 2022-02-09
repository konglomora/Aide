import { AideColors, Flex, GlovoColors } from 'components/styled'
import { Theme } from 'components/themes'
import { useAppDispatch, useAppSelector } from 'hooks'
import { CgSun } from 'react-icons/cg'
import { HiMoon } from 'react-icons/hi'

import { changeTheme } from 'store/slices/theme/themeSlice'

const ThemeChanger = () => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector((state) => state.theme.theme)
    const color = theme === Theme.aide ? AideColors.white : GlovoColors.darkGrey
    const icon =
        theme === Theme.aide ? (
            <CgSun size={30} cursor="pointer" color={color} />
        ) : (
            <HiMoon size={30} cursor="pointer" color={color} />
        )

    const themeToggler = () => {
        dispatch(changeTheme())
    }

    return (
        <Flex
            position="absolute"
            right="12em"
            width="30px"
            height="30px"
            mHeight="30px"
            onClick={themeToggler}
        >
            {icon}
        </Flex>
    )
}

export default ThemeChanger
