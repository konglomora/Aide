import axios from 'axios'
const ACCESS_TOKEN = '0a4fcce5995c4f7478bd0b891b265a73d0289ba4'
const ACCESS_TOKEN2 = 'ace68d53680920b040d5e419b048c4d99be6d65f'
const apiURL = 'http://www.aideindustries.tk'

export const aideApiAxios = axios.create({
    baseURL: apiURL,
    headers: {
        Authorization: `Token ${ACCESS_TOKEN2}`,
    },
})
