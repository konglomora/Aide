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
    StateStatus,
} from 'store/slices/onionsSlotsSlice'
import { allOnionCodes } from '../../../../helpers/onionCodes'

export interface IOnionSlotsUpdateCard {
    activeScheduleDates: string[]
}

export const getValidSlotFormat = (str: string): string => {
    return str ? str.split(' ')[1].slice(0, 5) : ''
}

export default function OnionSlotsUpdateCard(props: IOnionSlotsUpdateCard) {
    const {
        status,
        activeScheduleDates,
        onionScheduleStartSlots,
        onionScheduleFinishSlots,
    } = useAppSelector((state) => state.onionsSlots)

    const [onionCode, setOnionCode] = useState<string>('KIE')
    const [date, setDate] = useState<string>(activeScheduleDates[0])
    const [startSlot, setStartSlot] = useState<string>(
        getValidSlotFormat(onionScheduleStartSlots[0])
    )
    const [finishSlot, setFinishSlot] = useState<string>(
        getValidSlotFormat(onionScheduleFinishSlots[0])
    )

    const dispatch = useAppDispatch()
    useEffect(() => {
        console.log('[OnionSlotsUpdateCard] -> RENDERED')
        console.log(
            '[OnionSlotsUpdateCard] activeScheduleDates',
            activeScheduleDates
        )
        dispatch(axiosGetOnionScheduleSlots({ onionCode, date }))
    }, [date, onionCode])

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
            setOnionCode(e.target.value)
            console.log(
                '[OnionSlotsUpdateCard] Onion code select vale: ',
                e.target.value
            )
        }
        if (name === PeriodSelectors.start) {
            console.log(
                '[OnionSlotsUpdateCard] First slot of schedule: ',
                e.target.value
            )
        }
        if (name === PeriodSelectors.end) {
            console.log(
                '[OnionSlotsUpdateCard] Last slot of schedule: ',
                e.target.value
            )
        }
        if (name === 'bonusTypeSelect') {
            console.log('[OnionSlotsUpdateCard] Bonus type: ', e.target.value)
        }
    }

    const submitUpdateSlots = () => {
        console.log('[OnionSlotsUpdateCard] Slots update submitted')
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
                        id="0"
                        onChange={selectChangeHandler}
                    >
                        {activeScheduleDates.map((date: string, id: number) => (
                            <option value={date} key={id}>
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
                        value={onionCode}
                        id="1"
                        onChange={selectChangeHandler}
                    >
                        {allOnionCodes.map((code, id) => {
                            return (
                                <option value={code} key={id}>
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
                        id="2"
                        value={startSlot}
                        onChange={(e) => selectChangeHandler(e)}
                    >
                        {onionScheduleStartSlots.map((slot, id) => (
                            <option value={slot} key={id}>
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
                        value={finishSlot}
                        id="3"
                        onChange={(e) => selectChangeHandler(e)}
                    >
                        {onionScheduleFinishSlots.map((slot, id) => (
                            <option value={slot} key={id}>
                                {getValidSlotFormat(slot)}
                            </option>
                        ))}
                    </select>
                </Flex>

                <Flex width="13em" mHeight="50%" height="50%" align="center">
                    <TextContent fWeight="600" height="1em" textAlign="center">
                        Bonus: +
                    </TextContent>
                    <input type="number" style={{ width: '3em' }} />
                    <select
                        style={SelectStyle}
                        name="bonusTypeSelect"
                        id="11"
                        onChange={selectChangeHandler}
                    >
                        <option value="RUSH" key={12}>
                            RUSH
                        </option>
                        <option value="BW" key={13}>
                            BW
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
