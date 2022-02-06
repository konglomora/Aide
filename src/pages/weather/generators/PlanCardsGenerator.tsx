import { OnionPrecipitationCard } from '../cards/OnionPrecipitationCard'
import nextId from 'react-id-generator'
import { Areas } from 'store/helpers/Areas'
import { IOnionWeatherAnalysis } from 'store/slices/weather/types'

export interface IDayPlan {
    [key: string]: IOnionWeatherAnalysis[]
}

export const generatePlanCards = (dayPlan: IDayPlan): React.ReactElement[][] =>
    [Areas.kyiv, Areas.mio, Areas.small].map(
        (area: string): React.ReactElement[] =>
            dayPlan[area].map(
                (areaOnionPlan: IOnionWeatherAnalysis): React.ReactElement =>
                    generatePlanCard(areaOnionPlan)
            )
    )

const generatePlanCard = (
    areaOnionPlan: IOnionWeatherAnalysis
): React.ReactElement => {
    return <OnionPrecipitationCard {...areaOnionPlan} key={nextId()} />
}
