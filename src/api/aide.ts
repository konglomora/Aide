import axios from 'axios'

const aideApiAxios = axios.create({
    baseURL: process.env.REACT_APP_AIDE_API_URL,
    headers: {
        Authorization: `Token ${process.env.REACT_APP_AIDE_API_KEY}`,
    },
})

export default aideApiAxios
