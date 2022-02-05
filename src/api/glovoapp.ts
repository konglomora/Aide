import axios from 'axios'
import { requestService } from 'services'
import { IGlovoAdminHeaders } from 'store/slices/glovoapp/types'

const adminApiGlovoappAxios = axios.create({
    baseURL: process.env.REACT_APP_ADMIN_API_GLOVOAPP_URL,
})

// Request interceptor for API calls
adminApiGlovoappAxios.interceptors.request.use(
    async (config) => {
        const glovoApiHeaders: IGlovoAdminHeaders | undefined =
            await requestService.getGlovoappHeaders()

        const { user_agent, accept, authorization, content_type } =
            glovoApiHeaders!

        config.headers = {
            'user-agent': user_agent,
            accept: accept,
            authorization: authorization,
            'content-type': content_type,
        }

        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

// Response interceptor for API calls
adminApiGlovoappAxios.interceptors.response.use(
    (response) => {
        return response
    },
    async function (error) {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            await requestService.refreshGlovoappHeaders()
            const glovoApiHeaders: IGlovoAdminHeaders | undefined =
                await requestService.getGlovoappHeaders()

            const { user_agent, accept, authorization, content_type } =
                glovoApiHeaders!

            axios.defaults.headers = {
                'user-agent': user_agent,
                accept: accept,
                authorization: authorization,
                'content-type': content_type,
            }

            return adminApiGlovoappAxios(originalRequest)
        }
        return Promise.reject(error)
    }
)

export default adminApiGlovoappAxios
