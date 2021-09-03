import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {slots} from '../slots'
import OnionSaturationCard from "./OnionSaturationCard";
import Flex from "../../StyledComponents/Flex";
import Title from "../../StyledComponents/Title";

export default function SaturationReportPage() {

    const ACCESS_TOKEN = '0a4fcce5995c4f7478bd0b891b265a73d0289ba4'
    const stateReprort = [{
        city: "",
        difference: "",
        reason_saturation: "",
        area: "",
        saturation: ["",],
        level_saturation: " "
    }]

    const todayDataURL = 'http://www.aideindustries.tk:5000/today'
    const weekDataURL = 'http://www.aideindustries.tk:5000/week'
    const averageURL = 'http://www.aideindustries.tk:5000/avrg/'
    const jsonReportURL = 'http://www.aideindustries.tk:8000/analysis/'
    const newApiJSONLink = 'http://www.aideindustries.tk:8000/search/'

    const dataFilterURL = 'http://www.aideindustries.tk:8000/data/filter/'

    const [startPeriodSlotSelected, setStartPeriodSlotSelected] = useState('10:00')
    const [endPeriodSlotSelected, setEndPeriodSlotSelected] = useState('12:00')
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


    async function getSaturatedOnionsByPeriod(periodStart, periodEnd) {
        try {
            const response = await axios.get(`${dataFilterURL}?sat=low&start=${periodStart}&end=${periodEnd}&today=yes`,
                {
                    headers: {
                        'Authorization': `Token ${ACCESS_TOKEN}`
                    }
                })
            return response
        } catch (error) {
            console.log('Error блин :', error)
            return error
        }

    }

    async function getOnionSaturationReportObject(onionName, slotStart, slotEnd) {
        try {
            const response = await axios.get(`${jsonReportURL}${onionName}/${slotStart}/${slotEnd}`, {
                headers: {'Authorization': `Token ${ACCESS_TOKEN}`}
            })
            return await JSON.parse(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    async function getSatReport(slotStart, slotEnd,) {
        const slotStartHour = slotStart.substr(0, 2)
        const slotEndHour = slotEnd.substr(0, 2)

        const saturatedOnionsFilteredBySlotsPeriod = await getSaturatedOnionsByPeriod(slotStartHour, slotEndHour)
        console.log(saturatedOnionsFilteredBySlotsPeriod)
        const allCodesOfSaturatedOnionsAtSelectedPeriod = saturatedOnionsFilteredBySlotsPeriod.data.reduce((accum, onion) => {

            if (!accum.some(obj => obj.city === onion.city)) {
                accum.push(onion.city)
            }
            return accum
        }, [])

        const uniqueCodesOfSaturatedOnions = await allCodesOfSaturatedOnionsAtSelectedPeriod.filter((onionCode, index) => allCodesOfSaturatedOnionsAtSelectedPeriod.indexOf(onionCode) === index)

        const reportArray = await Promise.all(uniqueCodesOfSaturatedOnions.map(async name => {
            const onionCode = name.toLowerCase()
            return await getOnionSaturationReportObject(onionCode, slotStartHour, slotEndHour)
        }, []))

        return reportArray
    }

    useEffect(() => {
        async function fetchData() {
            setSaturationPeriodReport(await getSatReport(startPeriodSlotSelected, endPeriodSlotSelected))
        }

        fetchData()
    }, [sendRequestForReport])


    return (
        <Flex direction={'column'} align={'center'} margin={'4em 0 0 0'}>
            <Flex>
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
                            e.preventDefault()
                            setSendRequestForReport(!sendRequestForReport)
                        }}
                    >
                        Get report
                    </button>
                </form>
            </Flex>
            <Title align={'center'} fWeight={'800'} >{`Апдейт по сатурации с ${startPeriodSlotSelected} по ${endPeriodSlotSelected}`}</Title>
            <div>
                {saturationPeriodReport.map((onion, id) => {
                    if (onion) {
                        return <OnionSaturationCard {...onion} key={id}/>
                    }
                })}
            </div>
        </Flex>
    )
}
