import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.span`

	text-align: ${({ align }) => align || 'center'};
	margin: ${({ margin }) => margin || '0'};
	color: ${({ color }) => color || 'white'};
	text-decoration: ${({ decoration }) => decoration || 'none'};
	font-size: ${({ fSize }) => fSize || '2em'};
	font-weight: ${({ fWeight }) => fWeight || '300'};
	width: ${({ width }) => width || '100%'};
	height: ${({ height }) => height || '100%'};
	margin: ${({ margin }) => margin || '0'};
	text-align: ${({ textAlign }) => textAlign || 'start'};
	cursor: ${({ cursor }) => cursor || ''};
	display: ${({ display }) => display || 'inline'};
	text-decoration: ${({tDecoration}) => tDecoration || 'none'};
	background-color: ${({bColor}) => bColor || 'transparent'};
`

export default function Title(props) {
	return <StyledTitle {...props} />
}
