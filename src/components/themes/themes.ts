import { DefaultTheme } from 'styled-components'
import aideMainBack from 'assets/aide/img/Background.png'
import glovoMainBack from 'assets/glovo/img/glovo-bg-pattern.png'

import { AideColors, GlovoColors } from './colors'

enum Theme {
    aide = 'aide',
    glovo = 'glovo',
}

const aideTheme: DefaultTheme = {
    mainBackgroundColor: AideColors.smoothViolet,
    globalBorder: `4px solid ${AideColors.white}`,
    globalBorderRadius: '10px',
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
    selectBackground: AideColors.violet,
    selectBorder: AideColors.white,
    cardBorder: `4px solid ${AideColors.white}`,
    cardBorderRadius: '10px',
    cardBackgroundColor: AideColors.black,
    cardBackdropFilter: '',
    globalBackdropFilter: 'blur(2px)',
}
const glovoTheme: DefaultTheme = {
    mainBackgroundColor: GlovoColors.white,
    globalBorder: `4px solid ${AideColors.white}`,
    globalBorderRadius: '10px',
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
    selectBackground: GlovoColors.darkGrey,
    selectBorder: GlovoColors.yellow,
    cardBorder: `4px solid ${GlovoColors.darkGrey}`,
    cardBorderRadius: '10px',
    cardBackgroundColor: '',
    cardBackdropFilter: '',
    globalBackdropFilter: 'blur(2px)',
}

export { Theme, aideTheme, glovoTheme }
