import { ReactElement } from 'react'
import { GlobalStyle } from 'components/styled/global'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { capitalizeFirstLetter } from 'helpers/strings'
import { Flex } from 'components/styled'
import { AppRoutes } from 'routes'

function App(): ReactElement {
    const url = useLocation()
    const path: string[] = url.pathname.split('/')
    const subTitle = capitalizeFirstLetter(path[path.length - 1])
    console.log('[App] subTitle: ', subTitle)

    return (
        <Flex>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Aide | {subTitle}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <GlobalStyle />
            <AppRoutes />
            <ToastContainer />
        </Flex>
    )
}

export default App
