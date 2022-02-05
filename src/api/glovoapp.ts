import axios from 'axios'

const adminApiGlovoappAxios = axios.create({
    baseURL: process.env.REACT_APP_ADMIN_API_GLOVOAPP_URL,
})

export default adminApiGlovoappAxios
