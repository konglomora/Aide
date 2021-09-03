import React from 'react'
import styled from 'styled-components'

const StyledSpan = styled.span`
	font-size: ${({ fSize }) => fSize || '1em'};
`

export default function Label(props) {
	return <StyledSpan {...props} />
}
