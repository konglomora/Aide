import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
    height: 2em;
    width: ${(props) => props.width || '100px'};
    padding: 20px 10px;
    margin: ${({ margin }) => margin || '0'};
    border: 1px solid white;
    border-color: ${({ borderColor }) => borderColor};
    background-color: ${({ background }) => background || 'transparent'};
    color: ${({ color }) => color || 'white'};
    border-radius: 2px;
    &:hover,
    &:focus {
        outline: none;
    }
`

export default function Input(props) {
    return (
        <StyledInput
            {...props}
            type={props.type}
            placeholder={props.placeholder}
        />
    )
}
