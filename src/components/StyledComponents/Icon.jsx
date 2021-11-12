import React from 'react'
import styled from 'styled-components'

const StyledIconWrapper = styled.div`
    background-color: ${({ background }) => background || 'transparent'};
    border-radius: ${({ radius }) => radius || '0px'};
    margin: ${({ margin }) => margin || '0'};
    width: ${({ width }) => width || '100%'};
    padding: ${({ padding }) => padding || '0'};
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function Icon(props) {
    return (
        <StyledIconWrapper {...props}>
            <img src={props.src} alt="Icon" />
        </StyledIconWrapper>
    )
}
