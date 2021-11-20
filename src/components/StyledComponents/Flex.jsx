import React, { FC, JSXElementConstructor, ReactElement } from 'react'
import styled from 'styled-components'

// interface PropsFlex {
//     direction?: string
//     align?: string
//     wrap?: string
//     justify?: string
//     margin?: string
//     width?: string
//     height?: string
//     mHeight?: string
//     padding?: string
//     bColor?: string
//     background?: string
//     bFilter?: string
//     tDecoration?: string
//     bBorder?: string
//     tBorder?: string
//     lBorder?: string
//     rBorder?: string
//     border?: string
//     bRadius?: string
//     cursor?: string
//     position?: string
//     top?: string
//     left?: string
//     right?: string
//     bottom?: string
//     zIndex?: string
//     children?: // | string
//     // | string[]
//     // | FC
//     // | FC[]
//     | ReactElement
//         | Element
//         | ReactElement[]
//         // | ReactElement[][]
//         // | ReactElement<any, string | JSXElementConstructor<any>>
//         // | (ReactElement<any, string | JSXElementConstructor<any>> & string)
//         | (ReactElement<any, string | JSXElementConstructor<any>>[] | Element)[]
//         | ReactElement<any, string | JSXElementConstructor<any>>
// }

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
    background-size: ${({ backSize }) => backSize || ''};
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
    z-index: ${({ zIndex }) => zIndex || ''};
`

export const Flex = (props) => {
    return <StyledFlex {...props} />
}
