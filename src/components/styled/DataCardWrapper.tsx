import { Flex } from 'components/styled'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface IDataCardWrapper {
    border?: string
    borderColor?: string
    borderRadius?: string
    padding?: string
    margin?: string
    width?: string
    backgroundColor?: string
    children: ReactNode
}

const StyledCardWrapper = styled(Flex)<IDataCardWrapper>`
    border: ${({ theme }) => theme.cardBorder};
    border-radius: 10px;
    padding: 15px;
    margin: 10px;
    width: 30em;
    background-color: ${({ theme }) => theme.cardBackgroundColor};
    backdrop-filter: ${({ theme }) => theme.cardBackdropFilter};
`

export const DataCardWrapper: FC<IDataCardWrapper> = (props) => {
    const { children } = props
    return <StyledCardWrapper {...props}>{children}</StyledCardWrapper>
}
