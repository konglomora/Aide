import { Flex } from 'components/styled'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface ISaturationModeCardWrapper {
    padding?: string
    margin?: string
    width?: string
    children: ReactNode
}

const StyledModeCardWrapper = styled(Flex)<ISaturationModeCardWrapper>`
    border: ${({ theme }) => theme.cardBorder};
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align: 'column';
    border-radius: 10px;
    padding: 15px;
    margin: 10px;
    width: '100%';
    background-color: ${({ theme }) => theme.cardBackgroundColor};
    backdrop-filter: ${({ theme }) => theme.cardBackdropFilter};
`

export const SaturationModeCardWrapper: FC<ISaturationModeCardWrapper> = (
    props
) => {
    const { children } = props
    return <StyledModeCardWrapper {...props}>{children}</StyledModeCardWrapper>
}
