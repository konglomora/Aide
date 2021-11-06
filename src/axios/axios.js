import axios from 'axios'
import { ACCESS_TOKEN2 } from './private/token'
const apiURL = 'https://aideindustries.ml/'

export const aideApiAxios = axios.create({
    baseURL: apiURL,
    headers: {
        Authorization: `Token ${ACCESS_TOKEN2}`,
    },
})
