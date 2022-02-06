import { MyKnownError } from './reports/types'

export enum StateStatus {
    success = 'success',
    error = 'error',
    loading = 'loading',
}

export type TStateStatus =
    | StateStatus.success
    | StateStatus.loading
    | StateStatus.error
    | null

export type TError = null | undefined | string | MyKnownError | unknown
