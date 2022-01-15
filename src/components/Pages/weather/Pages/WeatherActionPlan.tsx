import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react'
import { Flex } from '../../../StyledComponents/Flex'
import Button from '../../../StyledComponents/Button'
import { useDispatch } from 'react-redux'
import { getWeatherActionPlan } from '../../../../store/slices/weatherActionPlanSlice'
import LoaderReact from '../../../StyledComponents/LoaderReact'
import { generatePlanCards } from '../Generators/PlanCardsGenereator'

import { ActionPlanCard } from '../Cards/ActionPlanCard'
import ESDES_PREP_GIF from '../../../../assets/gif/esdes-no-prep.gif'
import JOJO_LOADER from '../../../../assets/gif/jojo-loader.gif'
import ERROR_ANIME_GIF from '../../../../assets/gif/500-error.gif'
import { useAppSelector } from 'store/hooks'

const WeatherActionPlan = () => {
    const dispatch = useDispatch()
    const [formBackGround, setFormBackGround] = useState('')
    const [formBackGroundSize, setFormBackGroundSize] = useState('')
    const {
        status,
        error,
        period,
        uniquePrecipitatedPercentageCodes,
        actionPlans,
    } = useAppSelector((state) => state.weatherActionPlan)

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

    const [tomorrowPlanOnionCards, setTomorrowOnionCards] = useState<
        ReactElement<any, string | JSXElementConstructor<any>>[][]
    >([])
    const [afterTomorrowPlanOnionCards, setAfterTomorrowOnionCards] = useState<
        ReactElement<any, string | JSXElementConstructor<any>>[][]
    >([])
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
    useEffect(() => {
        console.log('weather tomorrowPlan: ', tomorrowPlan)
        console.log('weather afterTomorrowPlan: ', afterTomorrowPlan)
    }, [tomorrowPlan, afterTomorrowPlan])

    useEffect(() => {
        if (status === 'resolved') {
            setFormBackGround(`url(${ESDES_PREP_GIF})`)
            setFormBackGroundSize('20%')
        } else if (status === 'loading') {
            setFormBackGround(`url(${JOJO_LOADER})`)
            setFormBackGroundSize('20%')
        } else if (status === 'error') {
            setFormBackGround(`url(${ERROR_ANIME_GIF})`)
        }
    }, [status, isAfterTomorrowWithPrecipitation, isTomorrowWithPrecipitation])

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
                padding={'3em 0 2em 0'}
                bBorder={'2px solid white'}
                bFilter={'blur(2px)'}
                height="4%"
                mHeight="3%"
                top="3em"
                left="10em"
                width="100%"
                position="fixed"
                zIndex="2"
                background={formBackGround}
                backSize={formBackGroundSize}
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
