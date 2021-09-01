import axios from 'axios'
import React from 'react'
import {slots} from './Slots'
import OnionAnalytic from "./OnionAnalytic";
import {logDOM} from "@testing-library/react";

export default function Analytics() {
    const todayDataURL = 'http://www.aideindustries.tk:5000/today'
    const weekDataURL = 'http://www.aideindustries.tk:5000/week'
    const averageURL = 'http://www.aideindustries.tk:5000/avrg/'
    const jsonReportURL = 'http://www.aideindustries.tk:5000/analysis_json/'

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
            const response = await axios.get(`${jsonReportURL}${onionName}/${slotStart}-${slotEnd}`)
            info = response
        } catch (error) {
            console.log(error)
        }
        return info
    }


    async function getSatReport(slotStart, slotEnd) {
        // const selectedSlotsPeriod = `${slotStart} - ${slotEnd}`
        let indexofStartSlotsPeriod = slots.indexOf(slotStart)
        let indexofEndSlotsPeriod = slots.indexOf(slotEnd) === 0 ? 10000 : slots.indexOf(slotEnd)

        const todaySaturatedOnions = await getHighSaturatedOnions(weekDataURL)

        const sturatedOnionsFilteredBySlotsPeriod = todaySaturatedOnions.filter(onion => {
            const saturatedSlotOfOnion = onion.Slot.split(" - ")
            const indexOfSaturatedSlotStart = slots.indexOf(saturatedSlotOfOnion[0])
            const indexOfSaturatedSlotEnd = slots.indexOf(saturatedSlotOfOnion[1]) === 0 ? 1000 : slots.indexOf(saturatedSlotOfOnion[1])
            const saturatedSlotIsAtSelectedPeriod = indexofStartSlotsPeriod <= indexOfSaturatedSlotStart && indexofEndSlotsPeriod >= indexOfSaturatedSlotEnd

            if (saturatedSlotIsAtSelectedPeriod) {
                return onion
            }

        })
        // console.log( sturatedOnionsFilteredBySlotsPeriod)

        const codesOfSaturatedOnionsAtSelectedPeriod = sturatedOnionsFilteredBySlotsPeriod.reduce((accum, onion) => {
            if (!accum.some(obj => obj.City === onion.City)) {
                accum.push(onion.City)
            }
            return accum
        }, [])
        const uniqueCodesOfSaturatedOnions = await codesOfSaturatedOnionsAtSelectedPeriod.filter((onionCode, index) => codesOfSaturatedOnionsAtSelectedPeriod.indexOf(onionCode) === index)
        console.log(uniqueCodesOfSaturatedOnions)

        const reportDataArray = await uniqueCodesOfSaturatedOnions.map(async name => {
               return await getOnionSaturationInfo(name, '00', '01')

            }
        )

        return reportDataArray
    }


    getSatReport('17:00', '21:00')

// TODO: Устранить ошибку при отправке запроса на 'http://www.aideindustries.tk:5000/analysis_json/' - из-за не асинхронности кода на бэке - сервак падает

    const onion = {
        city: "DNP",
        difference: "D0 vs D7: курьеров -13%, заказов +35%. ",
        reason_saturation: "Причина сатурации - прирост заказов и уменьшилось количество активных курьеров в сравнении с прошлой неделей. ",
        area: "#A2",
        saturation: [
            "  19:00 - 20:00: 174 ",
            "20:00 - 21:00: 181",
            "21:00 - 22:00: 161",
            "22:00 - 22:30: 137"
        ],
        level_saturation: " #medium"
    }

    return (
        <div>
            <form action="#">
                <select name="slotSelector" id="1">
                    {slots.map((slot, id) => (
                        <option value={slot} key={id}>
                            {slot}
                        </option>
                    ))}
                </select>
                <select name="slotSelector" id="1">
                    {slots.map((slot, id) => (
                        <option value={slot} key={id}>
                            {slot}
                        </option>
                    ))}
                </select>
                <button
                    onClick={e => {
                        e.preventDefault()
                    }}
                >
                    Get report
                </button>
            </form>
            <div><OnionAnalytic {...onion} /></div>


        </div>
    )
}
