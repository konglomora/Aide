import { PeriodSelectors } from 'components/Pages/saturation/Pages/SaturationByPeriodPage'
import Button from 'components/StyledComponents/Button'
import { Flex } from 'components/StyledComponents/Flex'
import LoaderReact from 'components/StyledComponents/LoaderReact'
import {
    dateSelectStyle,
    SelectStyle,
} from 'components/StyledComponents/SelectStyles'
import TextContent from 'components/StyledComponents/TextContent'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
    axiosGetOnionScheduleSlots,
    BonusReasons,
    updateBonusReason,
    updateBonusSize,
    updateOnionSlots,
    updatePeriodEndTime,
    updatePeriodStartTime,
    updateSelectedOnionCode,
    updateSelectedScheduleDate,
} from 'store/slices/onionsSlotsSlice'
import { allOnionCodes } from '../../../../helpers/onionCodes'
import nextId from 'react-id-generator'

export interface IOnionSlotsUpdateCard {}

export const getValidSlotFormat = (str: string): string => {
    return str ? str.split(' ')[1].slice(0, 5) : ''
}

export default function OnionSlotsUpdateCard(props: IOnionSlotsUpdateCard) {
    const {
        status,
        selectedOnionCode,
        startTimeOfPeriod,
        endTimeOfPeriod,
        activeScheduleDates,
        onionScheduleStartSlots,
        onionScheduleFinishSlots,
        bonusReason,
        bonusSize,
    } = useAppSelector((state) => state.onionsSlots)

    const [date, setDate] = useState<string>(activeScheduleDates[0])

    const dispatch = useAppDispatch()
    useEffect(() => {
        console.log('[OnionSlotsUpdateCard] -> RENDERED')
        console.log(
            '[OnionSlotsUpdateCard] activeScheduleDates',
            activeScheduleDates
        )
        dispatch(
            axiosGetOnionScheduleSlots({ onionCode: selectedOnionCode, date })
        )
        dispatch(updateSelectedScheduleDate(date))
    }, [date, selectedOnionCode])

    const bonusSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateBonusSize(+e.target.value))
    }

    const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.name

        if (name === 'dateSelect') {
            setDate(e.target.value)
            console.log(
                '[OnionSlotsUpdateCard] Onion code select vale: ',
                e.target.value
            )
        }

        if (name === 'onionCodeSelect') {
            dispatch(updateSelectedOnionCode(e.target.value))
            console.log(
                '[OnionSlotsUpdateCard] Onion code select value: ',
                e.target.value
            )
        }
        if (name === PeriodSelectors.start) {
            console.log(
                `[OnionSlotsUpdateCard] Start slot of schedule: `,
                e.target.value
            )

            dispatch(
                updatePeriodStartTime({
                    startTimeOfPeriod: e.target.value,
                })
            )
        }
        if (name === PeriodSelectors.end) {
            console.log(
                '[OnionSlotsUpdateCard] Last slot of schedule: ',
                e.target.value
            )
            dispatch(
                updatePeriodEndTime({
                    endTimeOfPeriod: e.target.value,
                })
            )
        }
        if (name === 'bonusReasonSelect') {
            console.log('[OnionSlotsUpdateCard] Bonus type: ', e.target.value)
            dispatch(updateBonusReason(e.target.value))
        }
    }

    const submitUpdateSlots = async () => {
        console.log('[OnionSlotsUpdateCard] Slots update submitted')
        await dispatch(updateOnionSlots())
    }

    return (
        <>
            <Flex
                width="90%"
                height="5em"
                background="black"
                border="1px solid white"
                bRadius="10px"
                align="center"
                justify="space-evenly"
            >
                <LoaderReact
                    status={status}
                    style={{ margin: '0', width: '6em' }}
                />

                <Flex width="8em" mHeight="50%" height="50%" align="center">
                    <TextContent fWeight="600" height="1em" textAlign="center">
                        Date:
                    </TextContent>
                    <select
                        style={dateSelectStyle}
                        name="dateSelect"
                        value={date}
                        id={nextId()}
                        onChange={selectChangeHandler}
                    >
                        {activeScheduleDates.map((date: string) => (
                            <option value={date} key={nextId()}>
                                {date}
                            </option>
                        ))}
                    </select>
                </Flex>

                <Flex width="8em" mHeight="50%" height="50%" align="center">
                    <TextContent fWeight="600" height="1em" textAlign="center">
                        Onion:
                    </TextContent>
                    <select
                        style={SelectStyle}
                        name="onionCodeSelect"
                        value={selectedOnionCode}
                        id={nextId()}
                        onChange={selectChangeHandler}
                    >
                        {allOnionCodes.map((code) => {
                            return (
                                <option value={code} key={nextId()}>
                                    {code}
                                </option>
                            )
                        })}
                    </select>
                </Flex>

                <Flex width="18em" mHeight="50%" height="50%" align="center">
                    <TextContent fWeight="600" height="1em" textAlign="center">
                        Start:
                    </TextContent>
                    <select
                        style={SelectStyle}
                        name={PeriodSelectors.start}
                        id={nextId()}
                        value={startTimeOfPeriod}
                        onChange={selectChangeHandler}
                    >
                        {onionScheduleStartSlots.map((slot) => (
                            <option value={slot} key={nextId()}>
                                {getValidSlotFormat(slot)}
                            </option>
                        ))}
                    </select>
                    <TextContent fWeight="600" height="1em" textAlign="center">
                        End:
                    </TextContent>
                    <select
                        style={SelectStyle}
                        name={PeriodSelectors.end}
                        value={endTimeOfPeriod}
                        id={nextId()}
                        onChange={(e) => selectChangeHandler(e)}
                    >
                        {onionScheduleFinishSlots.map((slot) => (
                            <option value={slot} key={nextId()}>
                                {getValidSlotFormat(slot)}
                            </option>
                        ))}
                    </select>
                </Flex>

                <Flex width="16em" mHeight="50%" height="50%" align="center">
                    <TextContent fWeight="600" height="1em" textAlign="center">
                        Bonus: +
                    </TextContent>

                    <input
                        value={bonusSize}
                        type="number"
                        style={{ width: '5em' }}
                        onChange={bonusSizeHandler}
                        min="-100"
                        max="100"
                    />
                    <select
                        style={SelectStyle}
                        name="bonusReasonSelect"
                        id={nextId()}
                        value={bonusReason}
                        onChange={selectChangeHandler}
                    >
                        <option value={BonusReasons.RUSH} key={12}>
                            {BonusReasons.rush}
                        </option>
                        <option value={BonusReasons.BW} key={13}>
                            {BonusReasons.bad_weather}
                        </option>
                    </select>
                </Flex>

                <Button width="9em" onClick={() => submitUpdateSlots()}>
                    Update slots!
                </Button>
            </Flex>
        </>
    )
}
