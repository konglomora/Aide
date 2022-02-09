import { DefaultTheme } from 'styled-components'
import glovoMainBack from 'assets/glovo/img/lighthouse.png'
import aideMainBack from 'assets/aide/img/Background.svg'
import { AideColors, GlovoColors } from './colors'

enum Theme {
    aide = 'aide',
    glovo = 'glovo',
}
const aideTheme: DefaultTheme = {
    mainBackgroundColor: AideColors.smoothViolet,
    fontColor: AideColors.white,
    mainBackGroundImage: aideMainBack,
    fontFamily: 'string',
    backgroundColor: 'string',
    hoverBackGroundColor: 'string',
    buttonBackgroundColor: AideColors.black,
    buttonHoverBackgroundColor: AideColors.orange,
    linkFontColor: AideColors.white,
    linkHoverFontColor: AideColors.orange,
    linkActiveFontColor: AideColors.violet,
}
const glovoTheme: DefaultTheme = {
    mainBackgroundColor: GlovoColors.white,
    fontColor: GlovoColors.darkGrey,
    mainBackGroundImage: aideMainBack,
    fontFamily: 'string',
    backgroundColor: 'string',
    hoverBackGroundColor: 'string',
    buttonBackgroundColor: GlovoColors.green,
    buttonHoverBackgroundColor: GlovoColors.yellow,
    linkFontColor: GlovoColors.darkGrey,
    linkHoverFontColor: GlovoColors.green,
    linkActiveFontColor: GlovoColors.yellow,
}

export { Theme, aideTheme, glovoTheme }
