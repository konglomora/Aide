import { FC } from 'react'
import styled from 'styled-components'

interface IPropsStyledIcon {
    src: string
    background?: string
    radius?: string
    margin?: string
    width?: string
    height?: string
    padding?: string
    border?: string
    fill?: string
}

const StyledIcon = styled.div<IPropsStyledIcon>`
    background-color: ${({ background }) => background || 'transparent'};
    border: ${({ border }) => border || ''};
    border-radius: ${({ radius }) => radius || '0px'};
    margin: ${({ margin }) => margin || '0'};
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || '100%'};
    fill: ${({ fill }) => fill || ''};
    padding: ${({ padding }) => padding || '0'};
    display: flex;
    align-items: center;
    justify-content: center;
`

const Icon: FC<IPropsStyledIcon> = (props) => {
    return (
        <StyledIcon {...props}>
            <img
                width={props.width}
                height={props.height}
                src={props.src}
                alt="Icon"
            />
        </StyledIcon>
    )
}

export default Icon
