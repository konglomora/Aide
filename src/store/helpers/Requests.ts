import { alertService } from 'services'

enum Errors {
    expiredGlovoAdminApiToken_401 = 'Request failed with status code 401',
    invalidToken = 'Invalid access token',
}

enum ErrorCaseRecommendations {
    expiredGlovoAdminApiToken_401 = 'Token for admin APIx expired! Drink some coffee and come back! :)',
}

class Requests {
    processError(status: number, statusText: string) {
        if (status !== 200) {
            alertService.error(statusText)
            console.log('[Requests] processError statusText : ', statusText)
            throw new Error(statusText)
        }
    }
}

const requests = new Requests()

export { requests, Errors, ErrorCaseRecommendations }
