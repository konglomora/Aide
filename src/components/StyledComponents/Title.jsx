import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.span`
	color: white;
	font-weight: 300;
	font-size: 2em;
	text-align: ${({ align }) => align || 'center'};
	margin: ${({ margin }) => margin || '0'};
`

export default function Title(props) {
	return <StyledTitle {...props} />
}
