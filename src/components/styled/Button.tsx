import React, { FC } from 'react'
import styled from 'styled-components'
import { AideColors } from '.'

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
    disabled?: boolean
}

const StyledButton = styled.button<PropsStyledButton>`
    width: ${({ width }) => width || '100px'};
    margin: ${({ margin }) => margin || '0'};
    background-color: ${({ theme, disabled }) =>
        disabled ? AideColors.lightBlack : theme.buttonBackgroundColor};
    color: ${({ theme }) => theme.buttonTextColor};
    font-weight: 700;
    padding: ${({ padding }) => padding || '7px'};
    border-radius: ${({ bradius }) => bradius || '10px'};
    border: ${({ theme }) => `4px solid ${theme.buttonBorderColor}`};
    cursor: pointer;
    align-self: ${({ alignSelf }) => alignSelf || ''};
    transition: 0.45s linear;
    &:hover {
        font-weight: 700;
        transition: 0.45s linear;
        background-color: ${({ theme, disabled }) =>
            disabled
                ? AideColors.lightBlack
                : theme.buttonHoverBackgroundColor};
        color: ${({ theme, disabled }) =>
            disabled ? theme.buttonTextColor : theme.buttonHoverTextColor};
        border: ${({ theme, disabled }) =>
            disabled
                ? `4px solid ${theme.buttonBorderColor}`
                : `4px solid ${theme.buttonHoverBorderColor}`};
    }
`

const Button: FC<PropsStyledButton> = (props) => {
    const { type, onClick, disabled } = props
    return (
        <StyledButton
            onClick={onClick}
            disabled={disabled}
            type={type}
            {...props}
        />
    )
}

export default Button
