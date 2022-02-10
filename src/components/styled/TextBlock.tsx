import { FC } from 'react'
import styled from 'styled-components'

export interface PropsStyledDiv {
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

const StyledDiv = styled.div<PropsStyledDiv>`
    color: ${({ theme }) => theme.fontColor};
    text-decoration: ${({ decoration }) => decoration || 'none'};
    font-size: ${({ fSize }) => fSize || '1.12em'};
    font-weight: ${({ fWeight }) => fWeight || '400'};
    width: ${({ width }) => width || ''};
    height: ${({ height }) => height || ''};
    margin: ${({ margin }) => margin || '0'};
    text-align: ${({ textAlign }) => textAlign || 'start'};
    vertical-align: ${({ verticalAlign }) => verticalAlign || 'start'};
    cursor: ${({ cursor }) => cursor || ''};
    display: ${({ display }) => display || 'block'};
    text-decoration: ${({ tDecoration }) => tDecoration || 'none'};
    background-color: ${({ bColor }) => bColor || 'transparent'};
`

const TextBlock: FC<PropsStyledDiv> = (props) => {
    return <StyledDiv {...props} />
}

export default TextBlock
