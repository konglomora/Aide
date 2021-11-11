import React, { useEffect, useState } from 'react'
import nextId from 'react-id-generator'
import Flex from '../../../StyledComponents/Flex'
import Button from '../../../StyledComponents/Button'
import Input from '../../../StyledComponents/Input'
import { useDispatch, useSelector } from 'react-redux'
import { getWeatherActionPlan } from '../../../../store/report-slices/weatherActionPlanSlice'
import LoaderReact from '../../../StyledComponents/LoaderReact'
import { OnionPrecipitationCard } from '../Cards/OnionPrecipitationCard'
import Title from '../../../StyledComponents/Title'
import TextContent from '../../../StyledComponents/TextContent'
import { generatePlanCards } from '../helpers/PlanCardsGenereator'
import { mockedActionPlans } from '../../../../mocs/WeatherReportMocs'
import {
    PrecipitationCard,
    IOnionPrecipitationCardProps,
} from '../Cards/PrecipitationCard'

const WeatherActionPlan = () => {
    const dispatch = useDispatch()
    const {
        status,
        error,
        period,
        uniquePrecipitatedPercentageCodes,
        actionPlans,
    } = useSelector((state) => state.weatherActionPlan)

    const {
        tomorrow,
        afterTomorrow,
        tomorrowDate,
        afterTomorrowDate,
        lastTimeUpdateOfTomorrow,
        lastTimeUpdateOfAfterTomorrow,
    } = period
    const { tomorrowUniqueCodes, afterTomorrowUniqueCodes } =
        uniquePrecipitatedPercentageCodes
    const { tomorrowPlan, afterTomorrowPlan } = actionPlans

    const [tomorrowPlanOnionCards, setTomorrowOnionCards] = useState([])
    const [afterTomorrowPlanOnionCards, setAfterTomorrowOnionCards] = useState(
        []
    )
    const isTomorrowWithPrecipitation = tomorrowUniqueCodes.length > 0
    const isAfterTomorrowWithPrecipitation = afterTomorrowUniqueCodes.length > 0

    useEffect(() => {
        isTomorrowWithPrecipitation
            ? setTomorrowOnionCards(generatePlanCards(tomorrowPlan))
            : setTomorrowOnionCards([])
        isAfterTomorrowWithPrecipitation
            ? setAfterTomorrowOnionCards(generatePlanCards(afterTomorrowPlan))
            : setAfterTomorrowOnionCards([])
    }, [tomorrowUniqueCodes, afterTomorrowUniqueCodes])

    function sendRequestForReport() {
        dispatch(
            getWeatherActionPlan({
                tomorrow: tomorrow,
                afterTomorrow: afterTomorrow,
            })
        )
    }
    useEffect(() => {
        sendRequestForReport()
    }, [])

    const propsForPrecipitationCard = {
        isTomorrowWithPrecipitation,
        isAfterTomorrowWithPrecipitation,
        tomorrowDate,
        afterTomorrowDate,
        lastTimeUpdateOfTomorrow,
        lastTimeUpdateOfAfterTomorrow,
        tomorrowPlanOnionCards,
        afterTomorrowPlanOnionCards,
    }

    return (
        <Flex direction={'column'} align={'center'}>
            <Flex justify={'center'} align={'center'} margin={'1em'}>
                <Button onClick={() => sendRequestForReport()}>Refresh</Button>
            </Flex>

            {status === 'resolved' && (
                <PrecipitationCard {...propsForPrecipitationCard} />
            )}
            {status === null && <LoaderReact />}
            {status === 'loading' && <LoaderReact animate={{ rotate: 360 }} />}
            {status === 'error' && <h2>An error occurred: {error}</h2>}
        </Flex>
    )
}

export default WeatherActionPlan
