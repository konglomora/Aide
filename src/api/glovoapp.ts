import { updateGlovoApiToken } from './../store/slices/glovoapp/glovoappApiSlice'
import { useAppDispatch, useAppSelector } from 'hooks'
import axios from 'axios'
import { alertService, requestService } from 'services'
import { IGlovoAdminHeaders } from 'store/slices/glovoapp/types'
import { store } from 'store'

const adminApiGlovoappAxios = axios.create({
    baseURL: process.env.REACT_APP_ADMIN_API_GLOVOAPP_URL,
    headers: {
        'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Safari/537.36',
        accept: 'application/json, text/plain, */*',
        'content-type': 'application/json',
    },
})

// Request interceptor for API calls
adminApiGlovoappAxios.interceptors.request.use(
    async (config) => {
        const { authorization } =
            store.getState().glovoappApi.glovoApiHeaders[0]!
        authorization && (config.headers.authorization = authorization)
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
        console.log('[adminApiGlovoappAxios] error: ', error)
        if (
            (error.response.status === 401 && !originalRequest._retry) ||
            (error.response.status === 400 && !originalRequest._retry)
        ) {
            originalRequest._retry = true
            await requestService.refreshGlovoappHeaders()
            const { authorization } =
                store.getState().glovoappApi.glovoApiHeaders[0]!

            authorization &&
                (axios.defaults.headers.authorization = authorization)
            alertService.success('Refreshed token from interceptor')
            return adminApiGlovoappAxios(originalRequest)
        }
        return Promise.reject(error)
    }
)

export default adminApiGlovoappAxios
