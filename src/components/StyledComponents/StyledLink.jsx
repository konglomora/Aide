import React from 'react'
import styled from 'styled-components'
import { NavLink, useMatch } from 'react-router-dom'

const SNavLink = styled(NavLink)`
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

const StyledNavLink = ({ to, text, ...props }) => {
    const match = useMatch(to)
    console.log({ match })
    return (
        <SNavLink to={to} {...props}>
            {text}
        </SNavLink>
    )
}

export default StyledNavLink
