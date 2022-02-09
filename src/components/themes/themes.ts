import { DefaultTheme } from 'styled-components'
import aideMainBack from 'assets/aide/img/Background.svg'
import glovoMainBack from 'assets/glovo/img/glovo-bg-pattern.png'

import { AideColors, GlovoColors } from './colors'

enum Theme {
    aide = 'aide',
    glovo = 'glovo',
}

const aideTheme: DefaultTheme = {
    mainBackgroundColor: AideColors.smoothViolet,
    fontColor: AideColors.white,
    mainBackgroundImage: aideMainBack,
    fontFamily: 'string',
    backgroundColor: 'string',
    hoverBackGroundColor: 'string',
    buttonTextColor: AideColors.black,
    buttonBorderColor: AideColors.white,
    buttonBackgroundColor: AideColors.orange,
    buttonHoverTextColor: AideColors.white,
    buttonHoverBackgroundColor: AideColors.violet,
    buttonHoverBorderColor: AideColors.black,
    linkFontColor: AideColors.white,
    linkHoverFontColor: AideColors.orange,
    linkActiveFontColor: AideColors.violet,
}
const glovoTheme: DefaultTheme = {
    mainBackgroundColor: GlovoColors.white,
    fontColor: GlovoColors.darkGrey,
    mainBackgroundImage: glovoMainBack,
    fontFamily: 'string',
    backgroundColor: 'string',
    hoverBackGroundColor: 'string',
    buttonTextColor: GlovoColors.white,
    buttonBorderColor: GlovoColors.white,
    buttonBackgroundColor: GlovoColors.green,
    buttonHoverTextColor: GlovoColors.darkGrey,
    buttonHoverBackgroundColor: GlovoColors.yellow,
    buttonHoverBorderColor: GlovoColors.darkGrey,
    linkFontColor: GlovoColors.darkGrey,
    linkHoverFontColor: GlovoColors.green,
    linkActiveFontColor: GlovoColors.yellow,
}

export { Theme, aideTheme, glovoTheme }
