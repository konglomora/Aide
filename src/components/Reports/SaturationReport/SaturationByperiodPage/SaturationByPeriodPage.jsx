import React, { useEffect, useState } from 'react'
import { slotsRegular } from '../../slots'
import OnionSaturationCard from '../OnionSaturationCard'
import Flex from '../../../StyledComponents/Flex'
import Title from '../../../StyledComponents/Title'
import Button from '../../../StyledComponents/Button'
import { SelectStyle } from '../../../StyledComponents/Select'
import { aideApiAxios } from '../../../../axios/axios'
import {
    axiosGetSaturatedOnionAnalyseObject,
    getSaturationReport,
    setPeriodOfReport,
} from '../../../../toolKitRedux/saturationPeriodReportSlice'
import { useDispatch, useSelector } from 'react-redux'

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
    const dispatch = useDispatch()
    const { status, error, periodStart, periodEnd, periodReport } = useSelector(
        (state) => state.saturationPeriodReport
    )

    const [saturationPeriodReport, setSaturationPeriodReport] =
        useState(stateReport)

    const [sendRequestForReport, setSendRequestForReport] = useState(false)

    function selectChangeHandler(e) {
        const name = e.target.name
        if (name === 'slotStartPeriodSelector') {
            dispatch(
                setPeriodOfReport({
                    periodStart: e.target.value.substr(0, 2),
                    periodEnd: periodEnd,
                })
            )
        } else if (name === 'slotEndPeriodSelector') {
            dispatch(
                setPeriodOfReport({
                    periodStart: periodStart,
                    periodEnd: e.target.value.substr(0, 2),
                })
            )
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
            return await JSON.parse(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getSatReport(slotStart, slotEnd) {
        const saturatedOnionsFilteredBySlotsPeriod = (
            await getSaturatedOnionsByPeriod(slotStart, slotEnd)
        ).data
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
                    slotStart,
                    slotEnd
                )
            }, [])
        )
        return reportArray
    }

    useEffect(() => {
        async function fetchData() {
            const report = await getSatReport(periodStart, periodEnd)
            if (report.length > 0) {
                setSaturationPeriodReport(report)
            }
        }
        fetchData()
    }, [sendRequestForReport])

    useEffect(() => {
        dispatch(getSaturationReport({ periodStart: '00', periodEnd: '03' }))
        // dispatch(axiosGetSaturatedOnionAnalyseObject({}))
    }, [])

    return (
        <Flex direction={'column'} align={'center'} margin={'4em 0 0 0'}>
            <Flex justify={'center'}>
                <form action="#">
                    <select
                        style={SelectStyle}
                        name="slotStartPeriodSelector"
                        id="1"
                        value={`${periodStart}:00`}
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
                        value={`${periodEnd}:00`}
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
                >{`Апдейт по сатурации с ${periodStart}:00 по ${periodEnd}:00`}</Title>
                <div>
                    {periodReport.map((onion, id) => {
                        if (onion) {
                            return <OnionSaturationCard {...onion} key={id} />
                        }
                    })}
                </div>
            </Flex>
            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>An error occurred: {error}</h2>}
        </Flex>
    )
}
