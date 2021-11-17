import React from 'react'
import Flex from '../../StyledComponents/Flex'
import StyledNavLink from '../../StyledComponents/StyledLink'
import TextContent from '../../StyledComponents/TextContent'
import { stylesForStyledLink } from '../Navigation/Layout'

export default function Page404() {
    return (
        <Flex margin="auto" justify="center" align="center" direction="column">
            <TextContent textAlign="center" height="10%" fSize="3em">
                <StyledNavLink
                    to={`/`}
                    {...stylesForStyledLink}
                    text={'Go to Home 🏠'}
                />
            </TextContent>
            <TextContent
                textAlign="center"
                margin="20px"
                height="10%"
                fSize="3em"
            >
                😞 😞 😞 404: Page not found 😞😞😞
            </TextContent>
        </Flex>
    )
}
