import React from 'react'
import styled from 'styled-components'

const StyledFlex = styled.div`
    display: flex;
    flex-direction: ${(props) => props.direction || 'row'};
    align-items: ${({ align }) => align || 'stretch'};
    flex-wrap: ${({ wrap }) => wrap || ''};
    justify-content: ${({ justify }) => justify || 'stretch'};
    margin: ${({ margin }) => margin || '0'};
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || '100%'};
    min-height: ${({ mHeight }) => mHeight || '100%'};
    padding: ${({ padding }) => padding || '0'};
    background-color: ${({ bColor }) => bColor || 'transparent'};
    background: ${({ background }) => background || ''};
    backdrop-filter: ${({ bFilter }) => bFilter || ''};
    text-decoration: ${({ tDecoration }) => tDecoration || 'none'};
    border-bottom: ${({ bBorder }) => bBorder || ''};
    border-top: ${({ tBorder }) => tBorder || ''};
    border-left: ${({ lBorder }) => lBorder || ''};
    border-right: ${({ rBorder }) => rBorder || ''};
    border: ${({ border }) => border || ''};
    border-radius: ${({ bRadius }) => bRadius || ''};
    cursor: ${({ cursor }) => cursor || ''};
    position: ${({ position }) => position || ''};
    top: ${({ top }) => top || ''};
    left: ${({ left }) => left || ''};
    right: ${({ right }) => right || ''};
    bottom: ${({ bottom }) => bottom || ''};
`

export default function Flex(props) {
    return <StyledFlex {...props} />
}
