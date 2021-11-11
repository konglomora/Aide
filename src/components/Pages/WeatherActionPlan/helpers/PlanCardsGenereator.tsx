import { OnionPrecipitationCard } from '../Cards/OnionPrecipitationCard'
import { IOnionPrecipitationCardProps } from '../Cards/OnionPrecipitationCard'
import nextId from 'react-id-generator'
import { Areas } from './Areas'

interface DayPlan {
    [key: string]: IOnionPrecipitationCardProps[]
}

export const generatePlanCards = (dayPlan: DayPlan): React.ReactElement[][] =>
    [Areas.kyiv, Areas.mio, Areas.small].map(
        (area: string): React.ReactElement[] =>
            dayPlan[area].map(
                (
                    areaOnionPlan: IOnionPrecipitationCardProps
                ): React.ReactElement => generatePlanCard(areaOnionPlan)
            )
    )

const generatePlanCard = (
    areaOnionPlan: IOnionPrecipitationCardProps
): React.ReactElement => (
    <OnionPrecipitationCard {...areaOnionPlan} key={nextId()} />
)
