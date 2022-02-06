import Button from 'components/styled/Button'
import { Flex, TextContent } from 'components/styled'
import { RootState } from 'store'
import { useAppDispatch, useAppSelector } from 'hooks'

import {
    setNextDay,
    setPrevDay,
    setToday,
} from 'store/slices/onions/schedule/scheduleSlice'
import { IOnionCodes, OnionCodes } from 'helpers/onionCodes'
import OnionSlotsCard from 'pages/onions/schedules/cards/OnionSlot'

export default function Schedule() {
    const dispatch = useAppDispatch()
    const { day } = useAppSelector((state: RootState) => state.schedule)

    const todayDateButtonHandler = () => {
        dispatch(setToday())
    }
    const prevDateButtonHandler = () => {
        dispatch(setPrevDay(day))
    }
    const nextDateButtonHandler = () => {
        dispatch(setNextDay(day))
    }
    const linkDate = day.format('YYYY-MM-DD')
    const displayDate = day.format('dddd DD.MM.YYYY')
    const slots = Object.keys(OnionCodes).map((areaName) => {
        const areaSlots = OnionCodes[areaName as keyof IOnionCodes].map(
            (code) => {
                return <OnionSlotsCard code={code} date={linkDate} />
            }
        )
        return (
            <Flex direction="column" align="center">
                <h1>{areaName.toUpperCase()}</h1>
                <Flex wrap="wrap" justify="center" width="70%">
                    {areaSlots}
                </Flex>
            </Flex>
        )
    })

    return (
        <Flex direction="column" width="100%" margin="5em 0 0 10em">
            <Flex width="40%" margin="0 auto" align="center">
                <Button onClick={todayDateButtonHandler}>Today</Button>
                <TextContent>{displayDate} </TextContent>
                <Button margin="0 1em 0 0" onClick={prevDateButtonHandler}>
                    ⇦
                </Button>
                <Button onClick={nextDateButtonHandler}>⇨</Button>
            </Flex>
            {slots}
        </Flex>
    )
}
