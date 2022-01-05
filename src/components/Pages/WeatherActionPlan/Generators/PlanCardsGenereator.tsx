import { OnionPrecipitationCard } from '../Cards/OnionPrecipitationCard'
import nextId from 'react-id-generator'
import { Areas } from '../../../../store/helpers/Areas'
import { IOnionWeatherAnalysis } from 'store/slices/weatherActionPlanSlice'

interface DayPlan {
    [key: string]: IOnionWeatherAnalysis[]
}

export const generatePlanCards = (dayPlan: DayPlan): React.ReactElement[][] =>
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
    console.log('areaOnionPlan: ', areaOnionPlan)
    return <OnionPrecipitationCard {...areaOnionPlan} key={nextId()} />
}
