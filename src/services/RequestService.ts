import { aideApiAxios } from 'api'
import { AxiosResponse } from 'axios'
import { alertService } from 'services'
import { requests } from 'store/helpers/Requests'
import { IGlovoAdminHeaders } from 'store/slices/glovoapp/types'

export class RequestService {
    async getNewGlovoappAuthToken(): Promise<string | undefined> {
        try {
            const glovoAdminHeaders: AxiosResponse<IGlovoAdminHeaders[]> =
                await aideApiAxios.get(`/refresh_token/`)

            requests.processError(
                glovoAdminHeaders.status,
                glovoAdminHeaders.statusText
            )
            window.sessionStorage.setItem(
                'glovoappAuthToken',
                glovoAdminHeaders.data[0]?.authorization
            )
            console.log(
                '[RequestService/getGlovoappHeaders] Saved auth token to session storage'
            )
            return glovoAdminHeaders.data[0]?.authorization
        } catch (error: Error | any) {
            console.log('[RequestService/getGlovoappHeaders] error:, ', error)
            alertService.error(error.message)
        }
    }

    async refreshGlovoappHeaders() {
        try {
            const response: AxiosResponse = await aideApiAxios.options(
                `/refresh_token/`
            )

            requests.processError(response.status, response.statusText)
        } catch (error: Error | any) {
            console.log(
                '[RequestService/refreshGlovoappHeaders] error: ',
                error
            )
            alertService.error(error.message)
        }
    }
}

const requestService = new RequestService()

export default requestService
