import axios from 'axios'
import dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'
import { glovoappService } from 'services'

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
        const token = window.sessionStorage.getItem('glovoappAuthToken') || ''
        const user = jwtDecode<GlovoappToken>(token!)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
        console.log(
            'Glovoapp auth token will expire at: ',
            dayjs(user.exp * 1000).format('HH:mm:ss of DD.MM.YY')
        )

        if (token && isExpired) {
            await glovoappService.refreshGlovoappHeaders() // ! Disabled token saving to ls of browser
            const newGlovoappAuthToken =
                await glovoappService.getNewGlovoappAuthToken()
            request.headers.authorization = newGlovoappAuthToken

            return request
        }

        request.headers.authorization = token
        return request
    },
    (error) => {
        Promise.reject(error)
    }
)

export default adminApiGlovoappAxios
