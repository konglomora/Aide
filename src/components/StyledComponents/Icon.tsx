import React, { FC } from 'react'
import styled from 'styled-components'

interface PropsStyledIconWrapper {
    src: string
    background?: string
    radius?: string
    margin?: string
    width?: string
    padding?: string
}

const StyledIconWrapper = styled.div<PropsStyledIconWrapper>`
    background-color: ${({ background }) => background || 'transparent'};
    border-radius: ${({ radius }) => radius || '0px'};
    margin: ${({ margin }) => margin || '0'};
    width: ${({ width }) => width || '100%'};
    padding: ${({ padding }) => padding || '0'};
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Icon: FC<PropsStyledIconWrapper> = (props) => {
    return (
        <StyledIconWrapper {...props}>
            <img src={props.src} alt="Icon" />
        </StyledIconWrapper>
    )
}
