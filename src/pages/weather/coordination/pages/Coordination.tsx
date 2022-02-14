import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Button, GlovoColors } from 'components/styled'
import {
    applyConfirmedCoordination,
    getWeatherActionPlan,
} from 'store/slices/weather/actionCoordinationSlice'
import { useAppSelector } from 'hooks'
import { alertService } from 'services'
import { ReportSlider, SliderCard } from 'components/animated'
import { generatePlanCards } from 'pages/weather/coordination/generators/PlanCardsGenerator'
import { ActionPlanCard } from 'pages/weather/coordination/cards/ActionPlanCard'
import { StateStatus } from 'store/helpers/Status'
import { useLocation } from 'react-router-dom'
import { capitalizeFirstLetter } from 'helpers/strings'
import { FooterSlider } from 'components/animated/FooterSlider'
import { SiGooglesheets } from 'react-icons/si'
import { logCoordination } from 'store/slices/sheets/logsSlice'
import { ThemeGif } from 'components/themes'
import dayjs from 'dayjs'

const WeatherActionPlan = () => {
    const dispatch = useDispatch()
    const [formBackGround, setFormBackGround] = useState<string>('')
    const [formBackGroundSize, setFormBackGroundSize] = useState<string>('')
    const [hasCoordinationToLog, setHasCoordinationToLog] = useState(false)

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
        setIsTomorrowWithPrecipitation(
            tomorrowUniqueCodes.length > 0 &&
                tomorrowUniqueCodes[0] !== 'No precipitation'
        )
        setIsAfterTomorrowWithPrecipitation(
            afterTomorrowUniqueCodes.length > 0 &&
                afterTomorrowUniqueCodes[0] !== 'No precipitation'
        )
        isTomorrowWithPrecipitation
            ? setTomorrowOnionCards(generatePlanCards(tomorrowPlan))
            : setTomorrowOnionCards([])
        isAfterTomorrowWithPrecipitation
            ? setAfterTomorrowOnionCards(generatePlanCards(afterTomorrowPlan))
            : setAfterTomorrowOnionCards([])
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const logTomorrowCoordination = () => {
        alertService.loading(dispatch(logCoordination(tomorrowPlan)), {
            success: 'Logged coordination.',
            pending: 'Logging coordination...',
            error: 'Error while logging coordination.',
        })
    }

    const applyTomorrowConfirmedCoordination = () => {
        const tomorrowDate = dayjs().add(1, 'days').format('DD.MM.YYYY')

        alertService.loading(
            dispatch(applyConfirmedCoordination({ date: tomorrowDate })),
            {
                pending: 'Applying confirmed coordination...',
                success: 'Applied confirmed coordination! ',
                error: 'Error while applying confirmed coordination...',
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
        const { gif, size } = status
            ? ThemeGif[theme].status[status]
            : { gif: '', size: '' }
        setFormBackGround(gif)
        setFormBackGroundSize(size)

        setHasCoordinationToLog(
            status === StateStatus.success && isTomorrowWithPrecipitation
        )
    }, [
        status,
        theme,
        isAfterTomorrowWithPrecipitation,
        isTomorrowWithPrecipitation,
    ])

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
                <Button margin="0 10px" onClick={() => sendRequestForReport()}>
                    Get
                </Button>
                <Button
                    margin="0 10px"
                    disabled={!hasCoordinationToLog}
                    onClick={() => logTomorrowCoordination()}
                >
                    Log
                </Button>
                <Button
                    margin="0 10px"
                    onClick={applyTomorrowConfirmedCoordination}
                >
                    Apply
                </Button>
            </SliderCard>
            <ReportSlider status={status}>
                <Flex
                    direction={'column'}
                    align={'center'}
                    justify="center"
                    width="100%"
                    margin="0 9em 5em 0"
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
