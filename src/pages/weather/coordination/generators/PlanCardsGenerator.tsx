import { OnionPrecipitationCard } from '../cards/OnionPrecipitationCard'
import nextId from 'react-id-generator'
import { Plan } from 'store/helpers/Plan'
import { IOnionWeatherAnalysis } from 'store/slices/weather/types'
import { IStateActionPlan } from 'store/slices/weather/actionCoordinationSlice'

export interface IDayPlan {
    [key: string]: IOnionWeatherAnalysis[]
}

export const generatePlanCards = (
    dayPlan: IStateActionPlan
): React.ReactElement[][] =>
    [Plan.kyiv, Plan.mio, Plan.small].map(
        (area: string): React.ReactElement[] =>
            dayPlan[area as keyof IStateActionPlan].map(
                (areaOnionPlan: IOnionWeatherAnalysis): React.ReactElement =>
                    generatePlanCard(areaOnionPlan)
            )
    )

const generatePlanCard = (
    areaOnionPlan: IOnionWeatherAnalysis
): React.ReactElement => {
    return <OnionPrecipitationCard {...areaOnionPlan} key={nextId()} />
}
