import React, { FC } from 'react'
import styled from 'styled-components'
interface InputProps {
    placeholder: string
    type: string
    value: string
    onChange: (e: React.ChangeEvent<any>) => void
    margin?: string
    borderColor?: string
    background?: string
    width?: string
    padding?: string
    'border-radius'?: string
    'border-color:'?: string
    border?: string
}

const StyledInput = styled.input<InputProps>`
    height: 2em;
    width: ${(props) => props.width || '100px'};
    padding: ${({ padding }) => padding || '0'};
    margin: ${({ margin }) => margin || '0'};
    border: ${({ border }) => border || '1px solid white'};
    border-color: ${({ borderColor }) => borderColor};
    background-color: ${({ background }) => background || 'white'};
    color: ${({ color }) => color || 'black'};
    border-radius: 10px;
    &:hover,
    &:focus {
        outline: none;
    }
`

export const Input: FC<InputProps> = (props) => {
    const { placeholder, type, value, onChange } = props
    return (
        <StyledInput
            {...props}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}
