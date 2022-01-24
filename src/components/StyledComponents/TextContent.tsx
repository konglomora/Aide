import { FC } from 'react'
import styled from 'styled-components'

export interface PropsStyledSpan {
    color?: string
    decoration?: string
    fSize?: string
    fWeight?: string | number
    width?: string
    height?: string
    margin?: string
    textAlign?: string
    verticalAlign?: string
    cursor?: string
    display?: string
    tDecoration?: string
    bColor?: string
}

const StyledSpan = styled.span<PropsStyledSpan>`
    color: ${({ color }) => color || 'white'};
    text-decoration: ${({ decoration }) => decoration || 'none'};
    font-size: ${({ fSize }) => fSize || '1em'};
    font-weight: ${({ fWeight }) => fWeight || '300'};
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || '100%'};
    margin: ${({ margin }) => margin || '0'};
    text-align: ${({ textAlign }) => textAlign || 'center'};
    vertical-align: ${({ verticalAlign }) => verticalAlign || 'middle'};
    cursor: ${({ cursor }) => cursor || ''};
    display: ${({ display }) => display || 'inline'};
    text-decoration: ${({ tDecoration }) => tDecoration || 'none'};
    background-color: ${({ bColor }) => bColor || 'transparent'};
`

const TextContent: FC<PropsStyledSpan> = (props) => {
    return <StyledSpan {...props} />
}

export default TextContent
