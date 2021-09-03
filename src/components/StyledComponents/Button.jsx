import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
	width: ${({ width }) => width || '100px'};
	background-color: rgb(144, 202, 249);
	color: rgb(042, 58, 72);
	font-weight: 500;
	padding: 5px;
	border-radius: 2px;
	border: none;
	cursor: pointer;
`

export default function Button(props) {
	return <StyledButton type={props.type} {...props} />
}
