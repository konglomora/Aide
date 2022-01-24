import axios from 'axios'
import {
    REACT_APP_AIDE_API_URL,
    REACT_APP_AIDE_API_KEY,
    REACT_APP_ADMIN_API_GLOVOAPP_URL,
    REACT_APP_CORS_ADMIN_API_GLOVOAPP_URL,
} from './env'

export const aideApiAxios = axios.create({
    baseURL: REACT_APP_AIDE_API_URL,
    headers: {
        Authorization: `Token ${REACT_APP_AIDE_API_KEY}`,
    },
})

export const adminApiGlovoappAxios = axios.create({
    baseURL: REACT_APP_CORS_ADMIN_API_GLOVOAPP_URL,
})
