import axios from 'axios'
import { REACT_APP_AIDE_API_URL, REACT_APP_AIDE_API_KEY } from './env'

export const aideApiAxios = axios.create({
    baseURL: REACT_APP_AIDE_API_URL,
    headers: {
        Authorization: `Token ${REACT_APP_AIDE_API_KEY}`,
    },
})
