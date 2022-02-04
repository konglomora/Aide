import axios from 'axios'

export const aideApiAxios = axios.create({
    baseURL: process.env.REACT_APP_AIDE_API_URL,
    headers: {
        Authorization: `Token ${process.env.REACT_APP_AIDE_API_KEY}`,
    },
})

export const adminApiGlovoappAxios = axios.create({
    baseURL: process.env.REACT_APP_ADMIN_API_GLOVOAPP_URL,
})
