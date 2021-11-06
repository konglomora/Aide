import axios from 'axios'
console.log(process.env)

const AIP_URL = process.env.REACT_APP_API_URL
const API_TOKEN = process.env.REACT_APP_API_KEY
export const aideApiAxios = axios.create({
    baseURL: AIP_URL,
    headers: {
        Authorization: `Token ${API_TOKEN}`,
    },
})
