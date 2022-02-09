import { AideColors } from 'components/styled'
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
    background-color: ${({ theme }) => theme.buttonBackgroundColor};
    color: ${({ theme }) => theme.buttonTextColor};
    font-weight: 700;
    padding: ${({ padding }) => padding || '7px'};
    border-radius: ${({ bradius }) => bradius || '5px'};
    border: ${({ theme }) => `3px solid ${theme.buttonBorderColor}`};
    cursor: pointer;
    align-self: ${({ alignSelf }) => alignSelf || ''};
    transition: 0.45s linear;
    &:hover {
        font-weight: 700;
        transition: 0.45s linear;
        background-color: ${({ theme }) => theme.buttonHoverBackgroundColor};
        color: ${({ theme }) => theme.buttonHoverTextColor};
        border: ${({ theme }) => `3px solid ${theme.buttonHoverBorderColor}`};
    }
`

const Button: FC<PropsStyledButton> = (props) => {
    const { type, onClick } = props
    return <StyledButton onClick={onClick} type={type} {...props} />
}

export default Button
