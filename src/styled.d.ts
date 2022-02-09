import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        mainBackgroundColor: string
        mainBackGroundImage: string
        fontColor: string
        fontFamily: string
        backgroundColor: string
        hoverBackGroundColor: string
        buttonBackgroundColor: string
        buttonHoverBackgroundColor: string
        linkFontColor: string
        linkHoverFontColor: string
        linkActiveFontColor: string
    }
}
