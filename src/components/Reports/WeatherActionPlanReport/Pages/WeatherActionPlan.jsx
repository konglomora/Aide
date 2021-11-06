import React from 'react'
import nextId from 'react-id-generator'
import Flex from '../../../StyledComponents/Flex'
import Button from '../../../StyledComponents/Button'
import Input from '../../../StyledComponents/Input'
import { useDispatch, useSelector } from 'react-redux'
import {
    getWeatherActionPlan,
    setDaysOfPlan,
} from '../../../../store/report-slices/weatherActionPlanSlice'
import LoaderReact from '../../../StyledComponents/LoaderReact'
import { OnionPrecipitationCard } from '../Cards/OnionPrecipitationCard.tsx'
import Title from '../../../StyledComponents/Title'
import TextContent from '../../../StyledComponents/TextContent'

const WeatherActionPlan = () => {
    const dispatch = useDispatch()
    const {
        status,
        error,
        period,
        uniquePrecipitatedPercentageCodes,
        actionPlan,
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
    const { tomorrowPlan, afterTomorrowPlan } = actionPlan

    const tomorrowPlanOnionCards = []

    if (tomorrowUniqueCodes.length > 0) {
        Object.keys(tomorrowPlan).forEach((plan) => {
            tomorrow[plan].forEach((planObject) => {
                console.log(planObject)
                tomorrowPlanOnionCards.push(
                    <OnionPrecipitationCard {...planObject} key={nextId()} />
                )
            })
        })
    }
    // console.log({ tomorrowUniqueCodes }, { afterTomorrowUniqueCodes })

    const afterTomorrowPlanOnionCards = []
    if (afterTomorrowUniqueCodes.length > 0) {
        Object.keys(afterTomorrowPlan).forEach((plan) => {
            afterTomorrowPlan[plan].forEach((planObject) => {
                afterTomorrowPlanOnionCards.push(
                    <OnionPrecipitationCard {...planObject} key={nextId()} />
                )
            })
        })
    }

    function dayCheckBoxChangeHandler(e) {
        const name = e.target.name
        if (name === 'tomorrow') {
            dispatch(
                setDaysOfPlan({
                    tomorrow: e.target.checked,
                    afterTomorrow: afterTomorrow,
                })
            )
        } else if (name === 'afterTomorrow') {
            dispatch(
                setDaysOfPlan({
                    tomorrow: tomorrow,
                    afterTomorrow: e.target.checked,
                })
            )
        }
    }

    function sendRequestForReport() {
        dispatch(
            getWeatherActionPlan({
                tomorrow: tomorrow,
                afterTomorrow: afterTomorrow,
            })
        )
    }

    return (
        <Flex direction={'column'} align={'center'}>
            <Flex justify={'center'} align={'center'} margin={'1em'}>
                <Button onClick={(e) => sendRequestForReport()}>
                    Get action plan
                </Button>
                <label>
                    <Input
                        type={'checkbox'}
                        checked={period.tomorrow}
                        name="tomorrow"
                        onChange={(e) => dayCheckBoxChangeHandler(e)}
                    />
                    <span>For tomorrow</span>
                </label>
                <label>
                    <Input
                        type={'checkbox'}
                        checked={period.afterTomorrow}
                        name="afterTomorrow"
                        onChange={(e) => dayCheckBoxChangeHandler(e)}
                    />
                    <span>For day after tomorrow</span>
                </label>
            </Flex>

            {status === 'resolved' && tomorrowPlanOnionCards.length > 0 && (
                <Flex>
                    <Title> Вероятность на завтра({tomorrowDate})</Title>
                    <TextContent>
                        Обновление данных было произведено:{' '}
                        {lastTimeUpdateOfTomorrow}
                    </TextContent>
                    {tomorrowPlanOnionCards}
                </Flex>
            )}
            {status === 'resolved' && tomorrowPlanOnionCards.length === 0 && (
                <Flex>
                    <Title>
                        Вероятность на завтра ({tomorrowDate}) отсутствует :)
                    </Title>
                    <TextContent>
                        Обновление данных было произведено:
                        {lastTimeUpdateOfTomorrow}
                    </TextContent>
                    {tomorrowPlanOnionCards}
                </Flex>
            )}

            {status === 'resolved' && afterTomorrowPlanOnionCards.length > 0 && (
                <Flex direction={'column'} align={'center'}>
                    <Title>
                        Вероятность на послезавтра ({afterTomorrowDate})
                    </Title>
                    <TextContent>
                        Обновление данных было произведено:
                        {lastTimeUpdateOfAfterTomorrow}
                    </TextContent>
                    {afterTomorrowPlanOnionCards}
                </Flex>
            )}
            {status === 'resolved' && afterTomorrowPlanOnionCards.length === 0 && (
                <Flex direction={'column'} align={'center'}>
                    <Title>
                        Вероятность на послезавтра ({afterTomorrowDate})
                        отсутствует :)
                    </Title>
                    <TextContent>
                        Обновление данных было произведено:
                        {lastTimeUpdateOfAfterTomorrow}
                    </TextContent>
                    {afterTomorrowPlanOnionCards}
                </Flex>
            )}
            {status === null && <LoaderReact />}
            {status === 'loading' && <LoaderReact animate={{ rotate: 360 }} />}
            {status === 'error' && <h2>An error occurred: {error}</h2>}
        </Flex>
    )
}

export default WeatherActionPlan
