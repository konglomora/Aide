import { TStateStatus } from '../../helpers/Status'
export interface IDataForScheduleActionLog {
    actionTime: string
    actionReason: string
    userName: string
    onionCode: string
    period: string
    bonusSize: number
    bonusType: string
    capacityPercentage: number
    dateOfSchedule: string
}

export interface IDataForCoordinationLog extends IDataForScheduleActionLog {
    saturationBotMode: string
    mode: string
    challenges: string
}

export interface ILogsState {
    status: TStateStatus
    error: null
    coordination: {
        hasOnionsToApplyBonus: boolean
        confirmedCoordinations: IConfirmedCoordinationRow[]
    }
}
