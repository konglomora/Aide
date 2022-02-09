import React from 'react'
import Button from 'components/styled/Button'
import { StateStatus } from 'store/helpers/Status'
import { SelectStyle, AideColors } from 'components/styled'
import { SliderCard } from 'components/animated'

export enum PeriodSelectors {
    start = 'start',
    end = 'end',
}

export interface IReportPeriodSelectCardProps {
    formBackGround: string
    formBackGroundSize: string
    periodStart: string
    periodEnd: string
    slotsRegular: string[]
    status: StateStatus | null
    selectChangeHandler(e: React.ChangeEvent<HTMLSelectElement>): void
    sendRequestForReport(): void
    reportIsEmpty?: boolean | null
}

export const ReportPeriodSelectCard: React.FC<IReportPeriodSelectCardProps> = (
    props
) => {
    const {
        formBackGround,
        formBackGroundSize,
        periodStart,
        periodEnd,
        slotsRegular,
        status,
        selectChangeHandler,
        sendRequestForReport,
        reportIsEmpty,
    } = props

    return (
        <SliderCard
            reportIsEmpty={reportIsEmpty}
            backgroundImage={formBackGround}
            backgroundSize={formBackGroundSize}
            status={status}
        >
            <select
                style={SelectStyle}
                name={PeriodSelectors.start}
                id="1"
                value={`${periodStart}:00`}
                onChange={selectChangeHandler}
            >
                {slotsRegular.map((slot, id) => (
                    <option value={slot} key={id}>
                        {slot}
                    </option>
                ))}
            </select>
            <select
                style={SelectStyle}
                name={PeriodSelectors.end}
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
            <Button onClick={sendRequestForReport}>Get report</Button>
        </SliderCard>
    )
}
