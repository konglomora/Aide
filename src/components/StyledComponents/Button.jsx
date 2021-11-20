import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
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

export default function Button(props) {
    const { type, onClick } = props
    return <StyledButton onClick={onClick} type={type} {...props} />
}
