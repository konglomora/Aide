import { FC } from 'react'
import styled from 'styled-components'

interface PropsSelect {
    name?: string | undefined
    id?: any | undefined
    value?: string
    width?: string
    height?: string
    background?: string
    color?: string
    fSize?: string
    border?: string
    padding?: string
    option?: {
        color?: string
        background?: string
        display?: string
        'white-space'?: string
        'min-height'?: string
        padding?: string
    }
}

const Select = styled.select<PropsSelect>`
    width: 100%;
    height: ${({ height }) => (height ? height : '35px')};
    background: ${({ background }) => (background ? background : 'white')};
    color: ${({ color }) => (color ? color : 'gray')};
    padding: ${({ padding }) => (padding ? padding : ' 0 0 0 5px')};
    font-size: ${({ fSize }) => (fSize ? fSize : '14px')};
    border: ${({ border }) => (border ? border : 'none')};

    option {
        color: black;
        background: white;
        display: flex;
        white-space: pre;
        min-height: 20px;
        padding: 0px 2px 1px;
    }
`

const StyledSelect: FC<PropsSelect> = (props) => {
    const { name, id, value } = props
    return <Select name={name} id={id} value={value} />
}

export default StyledSelect
