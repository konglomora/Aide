import { GsTelegramNick } from './../../../services/coordination/AreasInfo'
import { OpsManagersTelegramNick } from './../../../services/coordination/TelegramData'
export interface PropsGetPrecipitatedOnionsByDay {
    onionCode: string
    tomorrow: boolean
    afterTomorrow: boolean
}

export interface IOnionWeatherAnalysisResponse {
    city: string
    date: string
    slots: string
    percent_capacity_slots: number
    precipitation: string
    last_time_update: string
}

export interface IOnionWeatherAnalysis extends IOnionWeatherAnalysisResponse {
    wetStartSlot: string
    wetFinishSlot: string
    bonusSizeIncrease: number
    bonusReason: TBonusReason
    capacitySizeIncrease: number
    saturationBotMode: string
    mode: string
    challenges: string
    responsibleStaffTGNick: string
}

export interface IOnionWeather {
    id: number
    date: string
    last_time_update: string
    city: string
    time: string
    precipitation: number
}

export interface IUniqueCodesData {
    after_tomorrow_prep: {
        date: string
        unique_codes: string[]
    }
    tomorrow_prep: {
        date: string
        unique_codes: string[]
    }
}

export interface IPrecipitatedUniqueCodes {
    tomorrowUniqueCodes: string[]
    afterTomorrowUniqueCodes: string[]
}

export interface IPrecipitatedOnionPlanResponse {
    coordination: IOnionWeatherAnalysis
    tomorrow: boolean
    afterTomorrow: boolean
}

export interface IDayPlan {
    kyiv_plan: IOnionWeatherAnalysis[]
    mio_plan: IOnionWeatherAnalysis[]
    small_plan: IOnionWeatherAnalysis[]
}
