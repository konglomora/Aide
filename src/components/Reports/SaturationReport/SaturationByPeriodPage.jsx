import React, { useEffect, useState } from 'react'
import { slotsRegular } from '../slots'
import OnionSaturationCard from './OnionSaturationCard'
import Flex from '../../StyledComponents/Flex'
import Title from '../../StyledComponents/Title'
import Button from '../../StyledComponents/Button'
import { SelectStyle } from '../../StyledComponents/Select'
import {
    getSaturationReport,
    setPeriodOfReport,
} from '../../../toolKitRedux/saturationPeriodReportSlice'
import { useDispatch, useSelector } from 'react-redux'
import { log10 } from 'chart.js/helpers'

export default React.memo(
    function SaturationByPeriodPage() {
        const dispatch = useDispatch()
        const {
            status,
            error,
            periodStart,
            periodEnd,
            periodReport,
            kyiv_report,
            mio_report,
            small_report,
        } = useSelector((state) => state.saturationPeriodReport)

        const saturationReport = [
            ...kyiv_report,
            ...mio_report,
            ...small_report,
        ]
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

        useEffect(() => {
            async function getReport() {
                dispatch(
                    getSaturationReport({
                        periodStart: periodStart,
                        periodEnd: periodEnd,
                    })
                )
            }
            getReport()
        }, [sendRequestForReport])
        // console.log({ periodReport })
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
                        {saturationReport.map((onionReport, id) => {
                            // console.log(onionReport)
                            return (
                                <OnionSaturationCard
                                    {...onionReport}
                                    key={id}
                                />
                            )
                        })}
                    </div>
                    {/*<div>*/}
                    {/*    {status === 'resolved' &&*/}
                    {/*        saturationReport.map((reportArray) => {*/}
                    {/*            // reportArray.sort((a, b) => a.city)*/}
                    {/*            console.log(reportArray)*/}

                    {/*            return reportArray.map((onionReport, id) => {*/}
                    {/*                // console.log(onionReport)*/}
                    {/*                return (*/}
                    {/*                    <OnionSaturationCard*/}
                    {/*                        {...onionReport}*/}
                    {/*                        key={id}*/}
                    {/*                    />*/}
                    {/*                )*/}
                    {/*            })*/}
                    {/*        })}*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    {saturationReport.kyiv_report.map((reportObj, id) => (*/}
                    {/*        <OnionSaturationCard {...reportObj} key={id} />*/}
                    {/*    ))}*/}
                    {/*    {saturationReport.mio_report.map((reportObj, id) => (*/}
                    {/*        <OnionSaturationCard {...reportObj} key={id} />*/}
                    {/*    ))}*/}
                    {/*    {saturationReport.small_report.map((reportObj, id) => (*/}
                    {/*        <OnionSaturationCard {...reportObj} key={id} />*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                </Flex>
                {status === 'loading' && <h2>Loading...</h2>}
                {error && <h2>An error occurred: {error}</h2>}
            </Flex>
        )
    },
    (prevProps, nextProps) => {
        if (prevProps !== nextProps) {
            return true
        } else {
            return false
        }
    }
)
