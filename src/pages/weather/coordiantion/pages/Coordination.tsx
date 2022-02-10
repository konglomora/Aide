import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Button, GlovoColors } from 'components/styled'
import { getWeatherActionPlan } from 'store/slices/weather/weatherActionPlanSlice'
import ESDES_PREP_GIF from 'assets/aide/gif/esdes-no-prep.gif'
import JOJO_LOADER from 'assets/aide/gif/jojo-loader.gif'
import ERROR_ANIME_GIF from 'assets/aide/gif/500-error.gif'
import { useAppSelector } from 'hooks'

import { alertService } from 'services'
import { ReportSlider, SliderCard } from 'components/animated'
import { generatePlanCards } from 'pages/weather/coordiantion/generators/PlanCardsGenerator'
import { ActionPlanCard } from 'pages/weather/coordiantion/cards/ActionPlanCard'
import { StateStatus } from 'store/helpers/Status'
import { useLocation } from 'react-router-dom'
import { capitalizeFirstLetter } from 'helpers/strings'
import { FooterSlider } from 'components/animated/FooterSlider'
import { SiGooglesheets } from 'react-icons/si'

const WeatherActionPlan = () => {
    const dispatch = useDispatch()
    const [formBackGround, setFormBackGround] = useState('')
    const [formBackGroundSize, setFormBackGroundSize] = useState('')
    const { status, period, uniquePrecipitatedPercentageCodes, actionPlans } =
        useAppSelector((state) => state.weatherActionPlan)
    const theme = useAppSelector((state) => state.theme.theme)
    const url = useLocation()
    const path: string[] = url.pathname.split('/')
    const logTitle = capitalizeFirstLetter(path[path.length - 1])

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
        alertService.loading(
            dispatch(
                getWeatherActionPlan({
                    tomorrow: tomorrow,
                    afterTomorrow: afterTomorrow,
                })
            ),
            {
                success: 'Loaded coordination.',
                pending: 'Loading coordination...',
                error: 'Error while loading coordination.',
            }
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
        status,
    }
    useEffect(() => {
        console.log('weather tomorrowPlan: ', tomorrowPlan)
        console.log('weather afterTomorrowPlan: ', afterTomorrowPlan)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (status === StateStatus.success) {
            setFormBackGround(`url(${ESDES_PREP_GIF})`)
            setFormBackGroundSize('20%')
        } else if (status === StateStatus.loading) {
            setFormBackGround(`url(${JOJO_LOADER})`)
            setFormBackGroundSize('20%')
        } else if (status === StateStatus.error) {
            setFormBackGround(`url(${ERROR_ANIME_GIF})`)
        }
    }, [status, isAfterTomorrowWithPrecipitation, isTomorrowWithPrecipitation])

    return (
        <Flex
            direction={'column'}
            align={'center'}
            justify="center"
            margin="5em 0 0 12em"
            width="100%"
        >
            <SliderCard
                status={status}
                backgroundImage={formBackGround}
                backgroundSize={formBackGroundSize}
            >
                <Button onClick={() => sendRequestForReport()}>Refresh</Button>
            </SliderCard>
            <ReportSlider status={status}>
                <Flex
                    direction={'column'}
                    align={'center'}
                    justify="center"
                    width="100%"
                    margin="0 9em 0 0"
                >
                    <ActionPlanCard {...propsForPrecipitationCard} />
                </Flex>
            </ReportSlider>
            <FooterSlider
                href={
                    process.env
                        .REACT_APP_GOOGLE_SPREADSHEET_ACTIONS_COORDINATION_SHEET_LINK!
                }
                icon={<SiGooglesheets size={35} fill={GlovoColors.green} />}
                title={`${logTitle} log`}
                theme={theme}
            />
        </Flex>
    )
}

export default WeatherActionPlan
