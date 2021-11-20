import { useEffect, useState } from 'react'
import { Flex } from '../../../StyledComponents/Flex'
import Button from '../../../StyledComponents/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getWeatherActionPlan } from '../../../../store/slices/weatherActionPlanSlice'
import LoaderReact from '../../../StyledComponents/LoaderReact'
import { generatePlanCards } from '../Generators/PlanCardsGenereator'

import { ActionPlanCard } from '../Cards/ActionPlanCard'

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
    const [isTomorrowWithPrecipitation, setIsTomorrowWithPrecipitation] =
        useState(false)
    const [
        isAfterTomorrowWithPrecipitation,
        setIsAfterTomorrowWithPrecipitation,
    ] = useState(false)

    useEffect(() => {
        setIsTomorrowWithPrecipitation(tomorrowUniqueCodes.length > 0)
        setIsAfterTomorrowWithPrecipitation(afterTomorrowUniqueCodes.length > 0)
        isTomorrowWithPrecipitation
            ? setTomorrowOnionCards(generatePlanCards(tomorrowPlan))
            : setTomorrowOnionCards([])
        isAfterTomorrowWithPrecipitation
            ? setAfterTomorrowOnionCards(generatePlanCards(afterTomorrowPlan))
            : setAfterTomorrowOnionCards([])
    }, [
        tomorrowPlan,
        afterTomorrowPlan,
        afterTomorrowUniqueCodes.length,
        tomorrowUniqueCodes.length,
        isAfterTomorrowWithPrecipitation,
        isTomorrowWithPrecipitation,
    ])

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

    useEffect(() => {
        console.log('WeatherActionPlan tomorrowPlan: ', tomorrowPlan)
        console.log('WeatherActionPlan afterTomorrowPlan: ', afterTomorrowPlan)
    }, [tomorrowPlan, afterTomorrowPlan])
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
        <Flex
            direction={'column'}
            align={'center'}
            justify="center"
            margin="4em 0 0 20em"
            width="100%"
        >
            <Flex
                justify={'center'}
                align={'center'}
                margin={'1em 0'}
                width="20%"
            >
                <Button onClick={() => sendRequestForReport()}>Refresh</Button>
            </Flex>
            {status === 'resolved' && (
                <ActionPlanCard {...propsForPrecipitationCard} />
            )}
            <Flex
                direction={'column'}
                align={'center'}
                justify="center"
                width="100%"
                margin="0 9em 0 0"
            >
                {status === null && <LoaderReact />}
                {status === 'loading' && (
                    <LoaderReact animate={{ rotate: 360 }} />
                )}
                {status === 'error' && <h2>An error occurred: {error}</h2>}
            </Flex>
        </Flex>
    )
}

export default WeatherActionPlan
