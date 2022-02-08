export interface PropsGetSaturationReport {
    onionCodesArray: string[]
    periodStart: string
    periodEnd: string
}

export interface PropsAxiosGetSaturatedOnionAnalyseObject {
    onionCode: string
    periodStart: string
    periodEnd: string
}

export interface ISaturatedOnionBySlot {
    id: number
    data: string
    time: string
    area_tag: string
    mio: boolean
    city: string
    slot: string
    start_slot: number
    end_slot: number
    avr_orders: number
    avr_couriers: number
    avr_saturation: number
    mp_mode: boolean
    mp_mode_end: string
    mp_mode_start: string
}
export interface ISaturatedOnionAnalysis {
    area: string
    both_reason: boolean
    city: string
    difference: string
    less_courier: boolean
    level_saturation: string
    more_orders: boolean
    block_min: number
    mp_mode_min: number
    reason_saturation: string
    saturation: string[]
    compared_couriers: number
    compared_orders: number
    forAutoReport?: boolean
    diffStr?: string
    slotFilledStr?: string
}

export interface MyKnownError {
    errorMessage: string
}
