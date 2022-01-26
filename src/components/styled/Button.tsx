import { Colors } from 'components/styled'
import React, { FC } from 'react'
import styled from 'styled-components'

interface PropsStyledButton {
    type?: 'button' | 'submit' | 'reset' | undefined
    onClick?: (e?: React.MouseEvent<HTMLElement>) => void
    width?: string
    margin?: string
    bcolor?: string
    color?: string
    padding?: string
    bradius?: string
    border?: string
    alignSelf?: string
}

const StyledButton = styled.button<PropsStyledButton>`
    width: ${({ width }) => width || '100px'};
    margin: ${({ margin }) => margin || '0'};
    background-color: ${({ bcolor }) => bcolor || Colors.black};
    color: ${({ color }) => color || 'white'};
    font-weight: 700;
    padding: ${({ padding }) => padding || '7px'};
    border-radius: ${({ bradius }) => bradius || '5px'};
    border: ${({ border }) => border || '2px solid white'};
    cursor: pointer;
    align-self: ${({ alignSelf }) => alignSelf || ''};
    transition: 0.3s linear;
    &:hover {
        font-weight: 700;
        transition: 0.4s linear;
        background-color: rgb(252, 78, 78);
        color: black;
    }
`

const Button: FC<PropsStyledButton> = (props) => {
    const { type, onClick } = props
    return <StyledButton onClick={onClick} type={type} {...props} />
}

export default Button
