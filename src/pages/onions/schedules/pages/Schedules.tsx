import Button from 'components/styled/Button'
import {
    AideColors,
    Flex,
    GlovoColors,
    TextContent,
    Title,
} from 'components/styled'
import { RootState } from 'store'
import { useAppDispatch, useAppSelector } from 'hooks'
import {
    setNextDay,
    setPrevDay,
    // setToday,
} from 'store/slices/onions/schedule/scheduleSlice'
import { IOnionCodes, OnionCodes } from 'helpers/onionCodes'
import OnionSlotsCard from 'pages/onions/schedules/cards/OnionSlot'
import { Theme } from 'components/themes'
import FallingCard from 'components/animated/FallingCard'

export default function Schedule() {
    const dispatch = useAppDispatch()
    const { day } = useAppSelector((state: RootState) => state.schedule)
    const theme = useAppSelector((state) => state.theme.theme)
    const titleColor =
        theme === Theme.aide ? AideColors.white : GlovoColors.darkGrey
    const linkColor =
        theme === Theme.aide ? AideColors.violet : GlovoColors.green
    const linkHoverColor =
        theme === Theme.aide ? AideColors.white : GlovoColors.yellow

    // const todayDateButtonHandler = () => {
    //     dispatch(setToday())
    // }
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
                return (
                    <OnionSlotsCard
                        code={code}
                        date={linkDate}
                        linkColor={linkColor}
                        linkHoverColor={linkHoverColor}
                    />
                )
            }
        )
        return (
            <Flex direction="column" align="center" margin="1em 0 0 0">
                <Title fWeight="600" color={titleColor}>
                    {areaName.toUpperCase()}
                </Title>
                <Flex wrap="wrap" justify="center" width="70%">
                    {areaSlots}
                </Flex>
            </Flex>
        )
    })

    return (
        <FallingCard
            style={{
                width: '100%',
                margin: '3em 0 0 0',
            }}
        >
            <Flex
                direction="column"
                justify="center"
                align="center"
                width="100%"
                margin="4em 0 0 5em"
            >
                {/* <Button onClick={todayDateButtonHandler}>Today</Button> */}
                <Flex width="25%" margin="0 auto" align="center">
                    <Button margin="0 1em 0 0" onClick={prevDateButtonHandler}>
                        ⇦
                    </Button>
                    <TextContent fSize="1.4em" fWeight={600}>
                        {displayDate}
                    </TextContent>
                    <Button onClick={nextDateButtonHandler}>⇨</Button>
                </Flex>
                {slots}
            </Flex>
        </FallingCard>
    )
}
