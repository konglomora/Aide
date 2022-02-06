import axios from 'axios'
import dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'
import { alertService, requestService } from 'services'
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

interface GlovoappToken {
    iat: number
    iss: string
    exp: number
    role: string
    payload: string
    version: string
    jti: string
}

// Request interceptor for API calls
adminApiGlovoappAxios.interceptors.request.use(
    async (request) => {
        const glovoappAuthToken =
            window.sessionStorage.getItem('glovoappAuthToken')

        const user = jwtDecode<GlovoappToken>(glovoappAuthToken!)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

        console.log(
            '[adminApiGlovoappAxios] glovoappAuthToken isExpired: ',
            isExpired
        )
        if (glovoappAuthToken && isExpired) {
            await requestService.refreshGlovoappHeaders()
            const newGlovoappAuthToken =
                await requestService.getNewGlovoappAuthToken()
            request.headers.authorization = newGlovoappAuthToken
            return request
        }

        request.headers.authorization = glovoappAuthToken
        return request
    },
    (error) => {
        Promise.reject(error)
    }
)

// Response interceptor for API calls
// adminApiGlovoappAxios.interceptors.response.use(
//     (response) => {
//         return response
//     },
//     async function (error) {
//         const originalRequest = error.config
//         console.log('[adminApiGlovoappAxios] error: ', error)
//         if (
//             (error.response.status === 401 && !originalRequest._retry) ||
//             (error.response.status === 400 && !originalRequest._retry)
//         ) {
//             originalRequest._retry = true
//             await requestService.refreshGlovoappHeaders()
//             const { authorization } =
//                 store.getState().glovoappApi.glovoApiHeaders[0]!

//             authorization &&
//                 (axios.defaults.headers.authorization = authorization)
//             alertService.success('Refreshed token from interceptor')
//             return adminApiGlovoappAxios(originalRequest)
//         }
//         return Promise.reject(error)
//     }
// )

export default adminApiGlovoappAxios
