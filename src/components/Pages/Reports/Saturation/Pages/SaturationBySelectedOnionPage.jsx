import React from 'react'
import { slotsRegular } from '../../Slots'
import OnionSaturationCard from '../Cards/OnionSaturationCard'
import Flex from '../../../../StyledComponents/Flex'
import Title from '../../../../StyledComponents/Title'
import Button from '../../../../StyledComponents/Button'
import { SelectStyle } from '../../../../StyledComponents/SelectStyles'
import {
    deselectOnion,
    getSaturationReport,
    selectOnion,
    setPeriodOfReport,
} from '../../../../../store/slices/saturationSelectedOnionsSlice'
import { DefaultRootState, useDispatch, useSelector } from 'react-redux'
import AreaCodesCard from '../Cards/AreaCodesCard'
import LoaderReact from '../../../../StyledComponents/LoaderReact'

export default React.memo(function SaturationBySelectedOnion() {
    const dispatch = useDispatch()
    const {
        status,
        error,
        periodStart,
        periodEnd,
        kyiv_report,
        mio_report,
        small_report,
        areaCodes,
        selectedOnionCodes,
    } = useSelector((state) => state.selectedOnionsReport)

    const saturationReport = [...kyiv_report, ...mio_report, ...small_report]

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

    function onionCodesSelectHandler(e) {
        const onionCode = e.target.outerText
        dispatch(selectOnion(onionCode))
    }

    function onionDeselectHandler(e) {
        const onionCode = e.target.outerText
        dispatch(deselectOnion(onionCode))
    }

    function sendRequestForReport() {
        dispatch(
            getSaturationReport({
                onionCodesArray: selectedOnionCodes,
                periodStart: periodStart,
                periodEnd: periodEnd,
            })
        )
    }

    return (
        <Flex direction={'column'}>
            <Flex
                width={'95%'}
                align={'start'}
                margin={'2em auto'}
                direction={'column'}
                border={'2px solid white'}
                bFilter={'blur(2px)'}
            >
                <Flex
                    direction={'row'}
                    width={'100%'}
                    justify={'space-evenly'}
                    bBorder={'2px dashed white'}
                >
                    {areaCodes.map((onionCodesArray, index) => {
                        const title =
                            index === 0 ? 'Kyiv' : index === 1 ? 'MIO' : 'Small'
                        const width = title === 'Small' ? '60%' : '10%'
                        return (
                            <AreaCodesCard
                                width={width}
                                key={title}
                                cardTitle={title}
                                codes={onionCodesArray}
                                onClick={onionCodesSelectHandler}
                            />
                        )
                    })}
                </Flex>
                <AreaCodesCard
                    cardTitle="Selected onions for report"
                    codes={selectedOnionCodes}
                    onClick={onionDeselectHandler}
                />
                <Flex
                    justify={'center'}
                    tBorder={'2px solid white'}
                    padding={'15px 0'}
                >
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
                                sendRequestForReport()
                            }}
                            bcolor={'black'}
                            color={'white'}
                            bradius={'10px'}
                            border={'3px solid white'}
                        >
                            Get report
                        </Button>
                    </form>
                </Flex>
            </Flex>

            {status === 'resolved' && saturationReport.length > 0 && (
                <Flex
                    wrap={'wrap'}
                    width={'90%'}
                    border={'2px solid white'}
                    justify={'space-evenly'}
                    align={'stretch'}
                    padding={'10px'}
                    bRadius={'10px'}
                    bFilter={'blur(2px)'}
                    margin={'10px auto'}
                >
                    <Title
                        fWeight={'800'}
                    >{`Апдейт по сатурации с ${periodStart}:00 по ${periodEnd}:00`}</Title>
                    {saturationReport.map((onionReport, id) => {
                        if (status === 'resolved') {
                            return (
                                <OnionSaturationCard
                                    {...onionReport}
                                    key={id}
                                />
                            )
                        }
                    })}
                </Flex>
            )}
            <Flex justify={'center'} align={'center'}>
                {status === null && <LoaderReact />}
                {status === 'loading' && (
                    <LoaderReact animate={{ rotate: 360 }} />
                )}
                {error && <h2>An error occurred: {error}</h2>}
            </Flex>
        </Flex>
    )
})
