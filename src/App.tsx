import { Flex } from './components/StyledComponents/Flex'
import { AppRoutes } from './components/Pages/navigation/AppRoutes'
import { ReactElement } from 'react'
import { GlobalStyle } from 'components/StyledComponents/global'

function App(): ReactElement {
    return (
        <Flex>
            <GlobalStyle />
            <AppRoutes />
        </Flex>
    )
}

export default App
