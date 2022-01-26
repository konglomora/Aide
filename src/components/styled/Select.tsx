import { FC } from 'react'
import styled from 'styled-components'
import CSS from 'csstype'

const SelectStyle: CSS.Properties = {
    background: 'white',
    borderRadius: '10px',
    color: 'black',
    padding: '8px',
    appearance: 'none',
    width: '4rem',
    border: '3px solid white',
    outline: 'none',
    margin: '0 10px',
}

const dateSelectStyle: CSS.Properties = {
    ...SelectStyle,
    width: '9rem',
}

interface PropsStyledSelect {
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

const StyledSelect = styled.select<PropsStyledSelect>`
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

const Select: FC<PropsStyledSelect> = (props) => {
    const { name, id, value } = props
    return <StyledSelect name={name} id={id} value={value} />
}

export { Select, SelectStyle, dateSelectStyle }
