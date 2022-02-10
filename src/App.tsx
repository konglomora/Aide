import { ReactElement } from 'react'
import { GlobalStyle } from 'components/themes/global'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { capitalizeFirstLetter } from 'helpers/strings'
import { Flex } from 'components/styled'
import { AppRoutes } from 'routes'
import { ThemeProvider } from 'styled-components'
import { aideTheme, glovoTheme, Theme } from 'components/themes'
import { useAppSelector } from 'hooks'
import glovoIcon from 'assets/glovo/img/thunder.png'
import aideIcon from 'assets/aide/img/favicon.png'

function App(): ReactElement {
    const url = useLocation()
    const path: string[] = url.pathname.split('/')
    const subTitle = capitalizeFirstLetter(path[path.length - 1])
    const storeTheme = useAppSelector((state) => state.theme.theme)
    const theme = storeTheme === Theme.aide ? aideTheme : glovoTheme
    const favicon = storeTheme === Theme.aide ? aideIcon : glovoIcon

    return (
        <Flex>
            <ThemeProvider theme={theme}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Aide | {subTitle}</title>
                    <link rel="icon" type="image/png" href={favicon} />
                </Helmet>

                <GlobalStyle />
                <AppRoutes />
                <ToastContainer style={{ margin: '0em 0 5em 7em' }} />
            </ThemeProvider>
        </Flex>
    )
}

export default App
