import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FC } from 'react'

interface PropsSNavLink {
    to: string
    text?: string
    color?: string
    decoration?: string
    fSize?: string
    width?: string
    height?: string
    padding?: string
    margin?: string
    text_align?: string
    cursor?: string
    display?: string
    tDecoration?: string
    background_color?: string
    radius?: string
    border?: string
}

const SNavLink = styled(NavLink)<PropsSNavLink>`
    color: ${({ color }) => color || 'white'};
    text-decoration: ${({ decoration }) => decoration || 'none'};
    font-size: ${({ fSize }) => fSize || '1em'};
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || '100%'};
    padding: ${({ padding }) => padding || '0'};
    margin: ${({ margin }) => margin || '0'};
    text-align: ${({ text_align }) => text_align || 'start'};
    cursor: ${({ cursor }) => cursor || ''};
    display: ${({ display }) => display || 'inline'};
    text-decoration: ${({ tDecoration }) => tDecoration || 'none'};
    background-color: ${({ background_color }) => background_color || ''};
    border-radius: ${({ radius }) => radius || '0px'};
    border: ${({ border }) => border || ''};
    &.active {
        color: rgb(186, 143, 255);
    }
`

const StyledNavLink: FC<PropsSNavLink> = ({ to, text, ...props }) => {
    return (
        <SNavLink to={to} {...props}>
            {text}
        </SNavLink>
    )
}

export default StyledNavLink
