import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FC } from 'react'

const stylesForStyledLink = {
    width: '20%',
    height: '1em',
    radius: '15px',
    text_align: 'center',
}

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
    color: ${({ theme }) => theme.linkFontColor};
    font-size: ${({ fSize }) => fSize || '1.2rem'};
    width: ${({ width }) => width || ''};
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
    font-weight: 550;
    transition: 0.45s linear;

    &:hover {
        transition: 0.45s linear;
        /* color: rgb(252, 78, 78); */
        color: ${({ theme }) => theme.linkHoverFontColor};
    }
    &.active {
        color: ${({ theme }) => theme.linkActiveFontColor};
    }
`

const StyledNavLink: FC<PropsSNavLink> = ({ to, text, ...props }) => {
    return (
        <SNavLink to={to} {...props}>
            {text}
        </SNavLink>
    )
}

export { StyledNavLink, stylesForStyledLink }
