import { FC } from 'react'
import styled from 'styled-components'

const StyledTitle = styled.span<TitleProps>`
    text-align: ${({ align }) => align || 'center'};
    margin: ${({ margin }) => margin || '0'};
    color: ${({ color }) => color || 'white'};
    text-decoration: ${({ decoration }) => decoration || 'none'};
    font-size: ${({ fSize }) => fSize || '2em'};
    font-weight: ${({ fWeight }) => fWeight || '300'};
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || '100%'};
    margin: ${({ margin }) => margin || '0'};
    cursor: ${({ cursor }) => cursor || ''};
    display: ${({ display }) => display || 'inline'};
    background-color: ${({ bColor }) => bColor || 'transparent'};
`

interface TitleProps {
    align?: string
    color?: string
    margin?: string
    borderColor?: string
    background?: string
    width?: string
    padding?: string
    border?: string
    decoration?: string
    fSize?: string
    fWeight?: string
    height?: string
    cursor?: string
    display?: string
    bColor?: string
    children?: string | string[]
}

export const Title: FC<TitleProps> = (props) => {
    return <StyledTitle {...props}>{props.children}</StyledTitle>
}
