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
    forAutoReport?: boolean
    slotFilledStr?: string
}

export interface MyKnownError {
    errorMessage: string
}
