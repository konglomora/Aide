import React from 'react'
import styled from 'styled-components'

const StyledSpan = styled.span`
    color: ${({ color }) => color || 'white'};
    text-decoration: ${({ decoration }) => decoration || 'none'};
    font-size: ${({ fSize }) => fSize || '1em'};
    font-weight: ${({ fWeight }) => fWeight || '300'};
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || '100%'};
    margin: ${({ margin }) => margin || '0'};
    text-align: ${({ textAlign }) => textAlign || 'center'};
    cursor: ${({ cursor }) => cursor || ''};
    display: ${({ display }) => display || 'inline'};
    text-decoration: ${({ tDecoration }) => tDecoration || 'none'};
    background-color: ${({ bColor }) => bColor || 'transparent'};
`

export default function TextContent(props) {
    return <StyledSpan {...props} />
}
