import axios from "axios";
const ACCESS_TOKEN = '0a4fcce5995c4f7478bd0b891b265a73d0289ba4'
const apiURL = 'http://www.aideindustries.tk:8000'


export const aideApiAxios = axios.create({
    baseURL: apiURL,
    headers: {
        Authorization: `Token ${ACCESS_TOKEN}`
    }
})