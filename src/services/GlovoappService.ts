import { aideApiAxios } from 'api'
import { AxiosResponse } from 'axios'
import { alertService } from 'services'
import { requests } from 'store/helpers/Requests'

export interface IGlovoAdminHeaders {
    id: number
    user_agent: string
    accept: string
    authorization: string
    content_type: string
}

export class GlovoappService {
    async getNewGlovoappAuthToken(): Promise<string | undefined> {
        try {
            const glovoAdminHeaders: AxiosResponse<IGlovoAdminHeaders[]> =
                await aideApiAxios.get(`/refresh_token/`)

            requests.processError(
                glovoAdminHeaders.status,
                glovoAdminHeaders.statusText
            )
            // window.sessionStorage.setItem(
            //     'glovoappAuthToken',
            //     glovoAdminHeaders.data[0]?.authorization
            // )
            console.log(
                '[glovoappService/getGlovoappHeaders] Saved auth token to session storage'
            )
            return glovoAdminHeaders.data[0]?.authorization
        } catch (error: Error | any) {
            console.log('[glovoappService/getGlovoappHeaders] error:, ', error)
            alertService.error(error.message)
        }
    }

    async refreshGlovoappHeaders() {
        try {
            // const userIsAdmin =
            const response: AxiosResponse = await aideApiAxios.options(
                `/refresh_token/`
            )

            requests.processError(response.status, response.statusText)
            console.log(
                '[GlovoappService/refreshGlovoappHeaders] Refreshed expired token'
            )
            // alertService.success('Refreshed expired token')
        } catch (error: Error | any) {
            console.log(
                '[glovoappService/refreshGlovoappHeaders] error: ',
                error
            )
            alertService.error(error.message)
        }
    }
}

const glovoappService = new GlovoappService()

export default glovoappService
