import React from 'react'
import styled from 'styled-components'

const StyledFlex = styled.div`
    display: flex;
    flex-direction: ${(props) => props.direction || 'row'};
    align-items: ${({ align }) => align || 'stretch'};
    justify-content: ${({ justify }) => justify || 'stretch'};
    margin: ${({ margin }) => margin || '0'};
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || '100%'};
    padding: ${({ padding }) => padding || '0'};
    background-color: ${({ bColor }) => bColor || 'transparent'};
    text-decoration: ${({ tDecoration }) => tDecoration || 'none'};
    border-bottom: ${({ bBorder }) => bBorder || ''};
    border: ${({ border }) => border || ''};
    border-radius: ${({ bRadius }) => bRadius || ''};
`

export default function Flex(props) {
    return <StyledFlex {...props} />
}
