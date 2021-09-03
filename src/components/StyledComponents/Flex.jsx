import React from 'react'
import styled from 'styled-components'

const StyledFlex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'stretch'};
  justify-content: ${props => props.justify || 'stretch'};
  margin: ${({margin}) => margin || '0'};
  width: ${({width}) => width || '100%'};
  height: ${({height}) => height || '100%'};
  padding: ${({padding}) => padding || '0'};
  background-color: ${({bColor}) => bColor || 'transparent'};
  text-decoration: ${({tDecoration}) => tDecoration || 'none'};
  border-bottom: ${({bBorder}) => bBorder || ''};
`

export default function Flex(props) {
    return <StyledFlex {...props} />
}
