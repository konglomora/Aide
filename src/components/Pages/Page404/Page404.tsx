import React from 'react'
import Flex from '../../StyledComponents/Flex'
import StyledNavLink from '../../StyledComponents/StyledLink'
import TextContent from '../../StyledComponents/TextContent'
import { stylesForStyledLink } from '../Navigation/Layout'

export default function Page404() {
    return (
        <Flex margin="auto" justify="center" align="center">
            <TextContent textAlign="center" margin="20% auto" fSize="4em">
                😞 😞 😞 404: Page not found 😞😞😞
            </TextContent>
            <TextContent textAlign="center" margin="20% auto" fSize="4em">
                <StyledNavLink
                    to={`/`}
                    {...stylesForStyledLink}
                    text={'Go to Home 🏠'}
                />
            </TextContent>
        </Flex>
    )
}
