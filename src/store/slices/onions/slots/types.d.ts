export interface IOnionScheduleSlotsResponse {
    bonus: number
    bonusReasons: string[]
    capacity: number
    couriers: number
    dedicatedCapacity: null | any
    enabled: boolean
    excellence: boolean
    finishTime: string
    guarantee: number
    id: number
    reducedByNoShow: boolean
    standbyCouriersCapacity: null | any
    startTime: string
}

export interface PropsGetOnionScheduleSlots {
    onionCode: string
    date: string
}

export interface IOnionScheduleSlots {
    allOnionSlots: IOnionScheduleSlotsResponse[]
    workingSlots: IOnionScheduleSlotsResponse[]
    onionScheduleStartSlots: string[]
    onionScheduleFinishSlots: string[]
}

export interface ISlotForUpdate {
    bonus: number
    bonusReasons: string[]
    capacity: number
    excellence: boolean
    guarantee: number
    id: number
}

export interface IUpdateManySlots {
    notifyCouriers: boolean
    slots: ISlotForUpdate[]
}
