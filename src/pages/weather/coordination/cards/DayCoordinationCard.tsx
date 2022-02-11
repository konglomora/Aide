import { Flex, TextContent, Title } from 'components/styled'
import { useAppSelector } from 'hooks'
import { Roles } from 'pages/authentication/userRoles'
import React, { FC } from 'react'

export interface IDayCoordinationCard {
    coordinationCards: React.ReactElement[][]
    coordinationDate: string
    lastTimeUpdate: string
}

const styleForCard = {
    direction: 'row',
    width: '90%',
    wrap: 'wrap',
    border: '4px solid white',
    justify: 'space-evenly',
    align: 'stretch',
    padding: '10px',
    bRadius: '10px',
    bFilter: 'blur(2px)',
    margin: '10px 0px',
}

export const DayCoordinationCard: FC<IDayCoordinationCard> = (props) => {
    const { coordinationCards, coordinationDate, lastTimeUpdate } = props
    const userIsAdmin = useAppSelector(
        (state) => state.user.role === Roles.admin
    )
    const coordination =
        coordinationCards.length > 1 ? (
            <Flex {...styleForCard}>
                <Title fWeight="500">{coordinationDate}</Title>
                {userIsAdmin && <TextContent>{lastTimeUpdate}</TextContent>}
                {coordinationCards}
            </Flex>
        ) : (
            <TextContent fWeight={600}>
                According to the forecast, there is no precipitation for
                {coordinationDate} for all cities.
            </TextContent>
        )
    return coordination
}
