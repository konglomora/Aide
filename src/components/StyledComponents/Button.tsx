import React from 'react'
import styled from 'styled-components'
import { IStyleProp } from './IStyledComponent'

const StyledButton = styled.button`
    width: ${({ width }: IStyleProp) => width || '100px'};
    background-color: ${({ bcolor }: IStyleProp) => bcolor || 'rgb(0, 0 ,0)'};
    color: ${({ color }: IStyleProp) => color || 'white'};
    font-weight: 500;
    padding: ${({ padding }: IStyleProp) => padding || '7px'};
    border-radius: ${({ bradius }: IStyleProp) => bradius || '5px'};
    border: ${({ border }: IStyleProp) => border || '2px solid white'};
    cursor: pointer;
`

export default function Button(props: IStyleProp): React.ReactElement {
    return <StyledButton type={props.type} {...props} />
}
