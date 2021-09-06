import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

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
    background-color: ${({ background_color }) => background_color || 'violet'};
    border-radius: ${({ radius }) => radius || '0px'};
    border: ${({ border }) => border || ''};
    &.active {
        background-color: blueviolet;
    }
`

const StyledNavLink = (props) => {
    return (
        <SNavLink to={props.to} {...props}>
            {props.text}
        </SNavLink>
    )
}

export default StyledNavLink
