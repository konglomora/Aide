import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {slots} from '../slots'
import OnionSaturationCard from "./OnionSaturationCard";
import {logDOM} from "@testing-library/react";

export default function SaturationReportPage() {
    const stateReprort = [{
        city: "DNP",
        difference: "D0 vs D7: курьеров -13%, заказов +35%. ",
        reason_saturation: "Причина сатурации - прирост заказов и уменьшилось количество активных курьеров в сравнении с прошлой неделей. ",
        area: "#A2",
        saturation: [
            "19:00 - 20:00: 174",
            "20:00 - 21:00: 181",
            "21:00 - 22:00: 161",
            "22:00 - 22:30: 137"
        ],
        level_saturation: " #medium"
    }]

    const todayDataURL = 'http://www.aideindustries.tk:5000/today'
    const weekDataURL = 'http://www.aideindustries.tk:5000/week'
    const averageURL = 'http://www.aideindustries.tk:5000/avrg/'
    const jsonReportURL = 'http://www.aideindustries.tk:5000/analysis_json/'
    const newApiJSONLink = 'http://www.aideindustries.tk:8000/search/'
    const [startPeriodSlotSelected, setStartPeriodSlotSelected] = useState('00:00')
    const [endPeriodSlotSelected, setEndPeriodSlotSelected] = useState('02:00')
    const [saturationPeriodReport, setSaturationPeriodReport] = useState(stateReprort)
    const [sendRequestForReport, setSendRequestForReport] = useState(false)

    function selectChangeHandler(e) {
        const name = e.target.name
        if (name === 'slotStartPeriodSelector') {
            setStartPeriodSlotSelected(e.target.value)
        } else if (name === 'slotEndPeriodSelector') {
            setEndPeriodSlotSelected(e.target.value)
        }

    }

    async function getHighSaturatedOnions(url) {
        let dataOfOnionsToday
        try {
            const response = await axios.get(url)
            dataOfOnionsToday = response.data.data
        } catch (error) {
            console.error(error)
        }

        return await dataOfOnionsToday.filter(onion => {
            const firstLevelSaturationTrashHold = 150

            const onionSaturationValid =
                onion.Saturation !== 0 && onion.Saturation.includes('%')
            if (onionSaturationValid) {
                const saturationNumber = +onion.Saturation.split('%').join('')
                if (saturationNumber > firstLevelSaturationTrashHold) {
                    return onion
                }
            }
        })
    }

    async function getOnionSaturationInfo(onionName, slotStart, slotEnd) {
        let info
        try {
            const response = await axios.get(`${newApiJSONLink}${onionName}/${slotStart}/${slotEnd}?an=yes`)
            info = await response.data
        } catch (error) {
            console.log(error)
        }
        return info
    }


    async function getSatReport(slotStart, slotEnd) {
        let indexofStartSlotsPeriod = slots.indexOf(slotStart)
        let indexofEndSlotsPeriod = slots.indexOf(slotEnd) === 0 ? 10000 : slots.indexOf(slotEnd)

        const todaySaturatedOnions = await getHighSaturatedOnions(todayDataURL)

        const sturatedOnionsFilteredBySlotsPeriod = todaySaturatedOnions.filter(onion => {
            const saturatedSlotOfOnion = onion.Slot.split(" - ")
            const indexOfSaturatedSlotStart = slots.indexOf(saturatedSlotOfOnion[0])
            const indexOfSaturatedSlotEnd = slots.indexOf(saturatedSlotOfOnion[1]) === 0 ? 1000 : slots.indexOf(saturatedSlotOfOnion[1])
            const saturatedSlotIsAtSelectedPeriod = indexofStartSlotsPeriod <= indexOfSaturatedSlotStart && indexofEndSlotsPeriod >= indexOfSaturatedSlotEnd

            if (saturatedSlotIsAtSelectedPeriod) {
                return onion
            }
        })

        const codesOfSaturatedOnionsAtSelectedPeriod = sturatedOnionsFilteredBySlotsPeriod.reduce((accum, onion) => {
            if (!accum.some(obj => obj.City === onion.City)) {
                accum.push(onion.City)
            }
            return accum
        }, [])

        const uniqueCodesOfSaturatedOnions = await codesOfSaturatedOnionsAtSelectedPeriod.filter((onionCode, index) => codesOfSaturatedOnionsAtSelectedPeriod.indexOf(onionCode) === index)
        console.log(uniqueCodesOfSaturatedOnions)


        const reportArray = await Promise.all( uniqueCodesOfSaturatedOnions.map(async name => {
            const slotStartHour = slotStart.substr(0, 2)
            const slotEndHour = slotEnd.substr(0, 2)
            const onionCode = name.toLowerCase()
            const onionSaturationReport = await getOnionSaturationInfo(onionCode, slotStartHour, slotEndHour)
            return JSON.parse(await onionSaturationReport)
        }, []))

        console.log(reportArray)

        return reportArray
    }

    useEffect(async () => {
            setSaturationPeriodReport(await getSatReport(startPeriodSlotSelected, endPeriodSlotSelected))
        }, [sendRequestForReport]
    )

    return (
        <div>
            <form action="#">
                <select name="slotStartPeriodSelector" id="1" value={startPeriodSlotSelected}
                        onChange={(e) => selectChangeHandler(e)}>
                    {slots.map((slot, id) => (
                        <option value={slot} key={id}>
                            {slot}
                        </option>
                    ))}
                </select>
                <select name="slotEndPeriodSelector" id="2" value={endPeriodSlotSelected}
                        onChange={(e) => selectChangeHandler(e)}>
                    {slots.map((slot, id) => (
                        <option value={slot} key={id}>
                            {slot}
                        </option>
                    ))}
                </select>
                <button
                    onClick={e => {
                        getSatReport(startPeriodSlotSelected, endPeriodSlotSelected)
                        e.preventDefault()
                        setSendRequestForReport(true)
                    }}
                >
                    Get report
                </button>
            </form>

            <div>{saturationPeriodReport.map((onion, id) => <OnionSaturationCard {...onion} key={id}/>)}</div>

        </div>
    )
}
