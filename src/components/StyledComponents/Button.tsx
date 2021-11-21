import React, { FC } from 'react'
import styled from 'styled-components'

interface PropsStyledButton {
    type?: 'button' | 'submit' | 'reset' | undefined
    onClick?: () => void
    width?: string
    margin?: string
    bcolor?: string
    color?: string
    padding?: string
    bradius?: string
    border?: string
}

const StyledButton = styled.button<PropsStyledButton>`
    width: ${({ width }) => width || '100px'};
    margin: ${({ margin }) => margin || '0'};
    background-color: ${({ bcolor }) => bcolor || 'rgb(0, 0 ,0)'};
    color: ${({ color }) => color || 'white'};
    font-weight: 500;
    padding: ${({ padding }) => padding || '7px'};
    border-radius: ${({ bradius }) => bradius || '5px'};
    border: ${({ border }) => border || '2px solid white'};
    cursor: pointer;
    &:active,
    &:hover {
        border: '2px solid green';
    }
`

const Button: FC<PropsStyledButton> = (props) => {
    const { type, onClick } = props
    return <StyledButton onClick={onClick} type={type} {...props} />
}

export default Button
