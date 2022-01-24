import { createProxyMiddleware } from 'http-proxy-middleware'
import { REACT_APP_ADMIN_API_GLOVOAPP_URL } from './env'

module.exports = (app: any) => {
    app.use(
        createProxyMiddleware('/admin/scheduling/slots', {
            target: 'http://localhost:3000',
            changeOrigin: true,
        })
    )
}
