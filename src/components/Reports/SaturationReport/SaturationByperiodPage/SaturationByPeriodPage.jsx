import React, { useEffect, useState } from 'react'
import { slotsRegular } from '../../slots'
import OnionSaturationCard from '../OnionSaturationCard'
import Flex from '../../../StyledComponents/Flex'
import Title from '../../../StyledComponents/Title'
import Button from '../../../StyledComponents/Button'
import { SelectStyle } from '../../../StyledComponents/Select'
import { aideApiAxios } from '../../../../axios/axios'

export default function SaturationByPeriodPage() {
    const stateReport = [
        {
            city: '',
            difference: '',
            reason_saturation: '',
            area: '',
            saturation: [''],
            level_saturation: ' ',
        },
    ]

    const [startPeriodSlotSelected, setStartPeriodSlotSelected] =
        useState('18:00')
    const [endPeriodSlotSelected, setEndPeriodSlotSelected] = useState('21:00')
    const [saturationPeriodReport, setSaturationPeriodReport] =
        useState(stateReport)
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
            return await aideApiAxios.get(
                `/data/filter/?sat=low&start=${periodStart}&end=${periodEnd}&today=yes`
            )
        } catch (error) {
            console.log('Error блин :', error)
            return error
        }
    }

    async function getOnionSaturationReportObject(
        onionName,
        slotStart,
        slotEnd
    ) {
        try {
            const response = await aideApiAxios.get(
                `/analysis/${onionName}/${slotStart}/${slotEnd}`
            )
            console.log(JSON.parse(response.data))
            return await JSON.parse(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getSatReport(slotStart, slotEnd) {
        const slotStartHour = slotStart.substr(0, 2)
        const slotEndHour = slotEnd.substr(0, 2)

        const saturatedOnionsFilteredBySlotsPeriod = (
            await getSaturatedOnionsByPeriod(slotStartHour, slotEndHour)
        ).data
        console.log(saturatedOnionsFilteredBySlotsPeriod)
        const allCodesOfSaturatedOnionsAtSelectedPeriod =
            saturatedOnionsFilteredBySlotsPeriod.reduce((accum, onion) => {
                if (!accum.some((obj) => obj.city === onion.city)) {
                    accum.push(onion.city)
                }
                return accum
            }, [])

        const uniqueCodesOfSaturatedOnions =
            await allCodesOfSaturatedOnionsAtSelectedPeriod.filter(
                (onionCode, index) =>
                    allCodesOfSaturatedOnionsAtSelectedPeriod.indexOf(
                        onionCode
                    ) === index
            )

        const reportArray = await Promise.all(
            uniqueCodesOfSaturatedOnions.map(async (name) => {
                return await getOnionSaturationReportObject(
                    name,
                    slotStartHour,
                    slotEndHour
                )
            }, [])
        )
        return reportArray
    }

    useEffect(() => {
        async function fetchData() {
            const report = await getSatReport(
                startPeriodSlotSelected,
                endPeriodSlotSelected
            )
            if (report.length > 0) {
                setSaturationPeriodReport(report)
            }
        }
        fetchData()
    }, [sendRequestForReport])

    return (
        <Flex direction={'column'} align={'center'} margin={'4em 0 0 0'}>
            <Flex justify={'center'}>
                <form action="#">
                    <select
                        style={SelectStyle}
                        name="slotStartPeriodSelector"
                        id="1"
                        value={startPeriodSlotSelected}
                        onChange={(e) => selectChangeHandler(e)}
                    >
                        {slotsRegular.map((slot, id) => (
                            <option value={slot} key={id}>
                                {slot}
                            </option>
                        ))}
                    </select>
                    <select
                        style={SelectStyle}
                        name="slotEndPeriodSelector"
                        id="2"
                        value={endPeriodSlotSelected}
                        onChange={(e) => selectChangeHandler(e)}
                    >
                        {slotsRegular.map((slot, id) => (
                            <option value={slot} key={id}>
                                {slot}
                            </option>
                        ))}
                    </select>
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            setSendRequestForReport(!sendRequestForReport)
                        }}
                        bcolor={'black'}
                        color={'white'}
                        bradius={'10px'}
                        border={'3px solid white'}
                    >
                        Get report by period
                    </Button>
                </form>
            </Flex>
            <Flex direction={'column'} width={'50%'}>
                <Title
                    fWeight={'800'}
                >{`Апдейт по сатурации с ${startPeriodSlotSelected} по ${endPeriodSlotSelected}`}</Title>
                <div>
                    {saturationPeriodReport.length > 0 ? (
                        saturationPeriodReport.map((onion, id) => {
                            if (onion) {
                                return (
                                    <OnionSaturationCard {...onion} key={id} />
                                )
                            }
                        })
                    ) : (
                        <Title>
                            {' '}
                            🦾 Онионов с сатурацией с {
                                startPeriodSlotSelected
                            }{' '}
                            по {endPeriodSlotSelected} не было 🦾
                        </Title>
                    )}
                </div>
            </Flex>
        </Flex>
    )
}
