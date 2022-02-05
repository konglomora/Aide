import React, { useEffect, useState } from 'react'
import nextId from 'react-id-generator'
import {
    Flex,
    Button,
    TextContent,
    Input,
    dateSelectStyle,
    SelectStyle,
    Colors,
} from 'components/styled'

import {
    axiosGetOnionScheduleSlots,
    updateBonusReason,
    updateBonusSize,
    updateCapacityPercentage,
    updateOnionSlots,
    updatePeriodEndTime,
    updatePeriodStartTime,
    updateSelectedOnionCode,
    updateSelectedScheduleDate,
} from 'store/slices/onions/slots/onionsSlotsSlice'
import { allOnionCodes } from 'helpers/onionCodes'
import { alertService } from 'services/AlertService'
import { PeriodSelectors } from 'pages/saturation/cards/ReportPeriodSelect'
import { useAppDispatch, useAppSelector } from 'hooks'
import { BonusReasons } from 'store/helpers/Bonus'

export interface IOnionSlotsUpdateCard {}

export const getValidSlotFormat = (str: string): string => {
    return str ? str.split(' ')[1].slice(0, 5) : ''
}

export default function OnionSlotsUpdateCard(props: IOnionSlotsUpdateCard) {
    const {
        selectedOnionCode,
        startTimeOfPeriod,
        endTimeOfPeriod,
        activeScheduleDates,
        onionScheduleStartSlots,
        onionScheduleFinishSlots,
        bonusReason,
        bonusSize,
        capacityPercentage,
    } = useAppSelector((state) => state.onionsSlots)

    const [date, setDate] = useState<string>(activeScheduleDates[0])

    const dispatch = useAppDispatch()
    useEffect(() => {
        console.log('[OnionSlotsUpdateCard] -> RENDERED')
        console.log(
            '[OnionSlotsUpdateCard] activeScheduleDates',
            activeScheduleDates
        )

        alertService.loading(
            dispatch(
                axiosGetOnionScheduleSlots({
                    onionCode: selectedOnionCode,
                    date,
                })
            ),
            {
                pending: `Loading  schedule for ${selectedOnionCode} at ${date}`,
                success: `Completed loading schedule for ${selectedOnionCode} at ${date} `,
                error: `Error while loading  schedule for ${selectedOnionCode} at ${date}`,
            },
            {
                autoClose: 1000,
            }
        )

        dispatch(updateSelectedScheduleDate(date))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, selectedOnionCode])

    const bonusSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateBonusSize(+e.target.value))
    }

    const capacityPercentageHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(updateCapacityPercentage(+e.target.value))
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
        const validSlots = [
            getValidSlotFormat(startTimeOfPeriod),
            getValidSlotFormat(endTimeOfPeriod),
        ]
        alertService.loading(
            dispatch(updateOnionSlots()),
            {
                pending: `Applying ${bonusSize}% ${bonusReason} for ${selectedOnionCode} at ${validSlots[0]}:${validSlots[1]} of ${date} `,
                success: `Applied and logged`,
                error: `Error while Applying ${bonusSize}% ${bonusReason} for ${selectedOnionCode} at ${validSlots[0]}:${validSlots[0]} of ${date} `,
            },
            {
                autoClose: 2000,
            }
        )
    }

    return (
        <>
            <Flex
                width="100%"
                height="5em"
                mHeight="4em"
                bColor={'rgb(24 25 26 / 78%);'}
                border="1px solid white"
                bRadius="10px"
                background={Colors.lightBlack}
                align="center"
                padding="0 1em"
                justify="space-evenly"
            >
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

                <Flex width="15em" mHeight="50%" height="50%" align="center">
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

                <Flex width="14em" mHeight="50%" height="50%" align="center">
                    <TextContent fWeight="600" height="1em" textAlign="center">
                        Bonus:
                    </TextContent>

                    <Input
                        value={bonusSize}
                        type="number"
                        onChange={bonusSizeHandler}
                        min="-100"
                        max="100"
                        placeholder="%"
                        padding={'4px'}
                        margin={'0 5px'}
                    />
                    <TextContent fWeight="600" height="1em" textAlign="start">
                        %
                    </TextContent>
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

                <Flex width="10em" mHeight="50%" height="50%" align="center">
                    <TextContent fWeight="600" height="1em" textAlign="center">
                        Capacity:
                    </TextContent>

                    <Input
                        value={capacityPercentage}
                        type="number"
                        onChange={capacityPercentageHandler}
                        min="-100"
                        max="100"
                        placeholder="%"
                        padding={'4px'}
                        margin={'0 5px'}
                    />
                    <TextContent fWeight="600" height="1em" textAlign="center">
                        %
                    </TextContent>
                </Flex>

                <Button width="9em" onClick={() => submitUpdateSlots()}>
                    Apply update
                </Button>
            </Flex>
        </>
    )
}
