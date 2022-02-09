import { ReactNode } from 'react'
export interface IPropsSlider {
    children:
        | ReactElement
        | Element
        | ReactElement[]
        | ReactNode
        | (ReactElement<any, string | JSXElementConstructor<any>>[] | Element)[]
        | ReactElement<any, string | JSXElementConstructor<any>>
    elementType?: string
    backgroundImage?: string
    backgroundSize?: string
    status?: StateStatus | null
    style?: CSS.Properties
    reportIsEmpty?: boolean | null
}

export interface IFooterSlider {
    href: string
    title: string

    theme: Theme
    icon: ReactNode
}
