import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        mainBackgroundColor: string
        mainBackgroundImage: string
        globalBorder: string
        globalBorderRadius: string
        globalBackdropFilter: string
        fontColor: string
        fontFamily: string
        backgroundColor: string
        hoverBackGroundColor: string
        buttonTextColor: string
        buttonBackgroundColor: string
        buttonBorderColor: string
        buttonHoverTextColor: string
        buttonHoverBackgroundColor: string
        buttonHoverBorderColor: string
        linkFontColor: string
        linkHoverFontColor: string
        linkActiveFontColor: string
        selectBackground: string
        selectBorder: string
        cardBorder: string
        cardBorderRadius: string
        cardBackgroundColor: string
        cardBackdropFilter: string
    }
}
