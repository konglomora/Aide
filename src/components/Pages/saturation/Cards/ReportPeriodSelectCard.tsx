import Button from 'components/StyledComponents/Button'
import { Colors } from 'components/StyledComponents/colors'
import { Flex } from 'components/StyledComponents/Flex'
import React, { useEffect, useState } from 'react'
import { StateStatus } from 'store/slices/onionsSlotsSlice'
import { SelectStyle } from '../../../StyledComponents/SelectStyles'
import {
    AnimationControls,
    motion,
    TargetAndTransition,
    VariantLabels,
} from 'framer-motion'
import { transitionForElements } from '../Pages/SaturationByPeriodPage'

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
    } = props

    const [animation, setanimation] = useState<
        AnimationControls | TargetAndTransition | VariantLabels | boolean
    >({ y: 0 })

    const topScreenPart = { y: ' -650%' }
    const centerScreenPart = { y: 0 }
    useEffect(() => {
        status === StateStatus.success && setanimation(topScreenPart)
        status === StateStatus.loading && setanimation(centerScreenPart)
    }, [status])

    return (
        <motion.div
            initial={StateStatus.success ? topScreenPart : centerScreenPart}
            animate={animation}
            transition={transitionForElements}
            style={{
                height: '5em',
                width: '77%',
                position: 'absolute',
                top: '40em',
                left: '20%',
                zIndex: '2',
            }}
        >
            <Flex
                justify={'center'}
                padding={'1em 1em 1em 1em'}
                border={'2px solid white'}
                bRadius={'10px'}
                bFilter={'blur(2px)'}
                height="3em"
                mHeight="3%"
                width="95%"
                background={formBackGround}
                backSize={formBackGroundSize}
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
                <Button
                    onClick={sendRequestForReport}
                    bcolor={Colors.black}
                    color={Colors.white}
                    bradius={'10px'}
                    border={'3px solid white'}
                >
                    Get report
                </Button>
            </Flex>
        </motion.div>
    )
}
