import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    width: ${({ width }) => width || '100px'};
    background-color: ${({ bcolor }) => bcolor || 'rgb(0, 0 ,0)'};
    color: ${({ color }) => color || 'white'};
    font-weight: 500;
    padding: ${({ padding }) => padding || '7px'};
    border-radius: ${({ bradius }) => bradius || '5px'};
    border: ${({ border }) => border || '2px solid white'};
    cursor: pointer;
`

export default function Button(props) {
    return <StyledButton type={props.type} {...props} />
}
