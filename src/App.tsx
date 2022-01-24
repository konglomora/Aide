import { Flex } from './components/StyledComponents/Flex'
import { AppRoutes } from './components/Pages/navigation/AppRoutes'
import { ReactElement } from 'react'
import { GlobalStyle } from 'components/StyledComponents/global'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { capitalizeFirstLetter } from 'helpers/strings'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
