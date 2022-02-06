export interface PropsGetPrecipitatedOnionsByDay {
    onionCode: string
    tomorrow: boolean
    afterTomorrow: boolean
}

export interface IOnionWeatherAnalysis {
    city: string
    date: string
    slots: string
    percent_capacity_slots: number
    precipitation: string
    last_time_update: string
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

export interface IGetPrecipitatedOnionPlanResponse {
    precipitatedOnionPlan: IOnionWeatherAnalysis
    tomorrow: boolean
    afterTomorrow: boolean
}
