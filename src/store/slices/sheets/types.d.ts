import { TStateStatus } from '../../helpers/Status'
export interface IDataForScheduleActionLog {
    actionTime: string
    userName: string
    onionCode: string
    period: string
    bonusSize: number
    bonusType: string
    capacityPercentage: number
    dateOfSchedule: string
}

export interface ILogsState {
    status: TStateStatus
    error: null
}
