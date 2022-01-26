import Button from 'components/styled/Button'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, TextContent } from 'components/styled'

export const UnknownRouteHandler: FC = () => {
    const navigate = useNavigate()

    return (
        <Flex margin="auto" justify="center" align="center" direction="column">
            <TextContent
                textAlign="center"
                margin="20px"
                height="10%"
                fSize="3em"
            >
                😞 😞 😞 404: Page not found 😞😞😞
            </TextContent>
            <Button onClick={() => navigate(-1)}>Go back</Button>
        </Flex>
    )
}
