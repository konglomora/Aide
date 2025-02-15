import { ChangeEvent, FC, ReactNode } from 'react'
import styled from 'styled-components'

export interface PropsFlex {
    direction?: string
    backSize?: string
    align?: string
    wrap?: string
    justify?: string
    margin?: string
    width?: string
    height?: string
    mHeight?: string
    padding?: string
    bColor?: string
    background?: string
    bFilter?: string
    tDecoration?: string
    bBorder?: string
    tBorder?: string
    lBorder?: string
    rBorder?: string
    border?: string
    bRadius?: string
    cursor?: string
    position?: string
    top?: string
    left?: string
    right?: string
    bottom?: string
    zIndex?: string
    hoverable?: boolean
    hoverColor?: string
    children?: ReactNode
    onClick?: (e: ChangeEvent<any>) => void
}

const StyledFlex = styled.div<PropsFlex>`
    display: flex;
    flex-direction: ${(props) => props.direction || 'row'};
    align-items: ${({ align }) => align};
    flex-wrap: ${({ wrap }) => wrap || ''};
    justify-content: ${({ justify }) => justify};
    margin: ${({ margin }) => margin || '0'};
    width: ${({ width }) => width || ''};
    height: ${({ height }) => height || ''};
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
    transition: 0.45s linear;

    &:hover {
        transition: 0.45s linear;
        background-color: ${({ hoverable, hoverColor }) => {
            if (hoverable && hoverColor) {
                return hoverColor
            } else if (hoverable) {
                return 'white'
            }
            return ''
        }}
`

const Flex: FC<PropsFlex> = (props) => {
    return <StyledFlex {...props} />
}

export default Flex
