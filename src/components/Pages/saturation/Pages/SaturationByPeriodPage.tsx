import { useEffect, useState } from 'react'
import { slotsRegular } from '../../../../helpers/slots'
import { Flex } from '../../../StyledComponents/Flex'
import { Title } from '../../../StyledComponents/Title'
import {
    AnimationControls,
    motion,
    TargetAndTransition,
    Transition,
    VariantLabels,
} from 'framer-motion'

import {
    getSaturationReport,
    setPeriodOfReport,
} from '../../../../store/slices/saturationPeriodReportSlice'
import TextContent from '../../../StyledComponents/TextContent'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import FRANKS_SUCCESS_GIF from '../../../../assets/gif/franks-dance.gif'
import JOJO_LOADER from '../../../../assets/gif/jojo-loader.gif'
import ERROR_ANIME_GIF from '../../../../assets/gif/500-error.gif'
import OnionSaturationCard from '../Cards/OnionSaturationCard'
import { Roles } from 'components/Pages/Auth/helpers'
import { StateStatus } from 'store/slices/onionsSlotsSlice'
import {
    PeriodSelectors,
    ReportPeriodSelectCard,
} from '../Cards/ReportPeriodSelectCard'

export const transitionForElements: Transition = {
    delay: 0.15,
    duration: 0.8,
    type: 'spring',
}

export default function SaturationByPeriodPage() {
    const dispatch = useAppDispatch()
    const { saturationPeriodReport } = useAppSelector((state) => state)
    const [formBackGround, setFormBackGround] = useState('')
    const [formBackGroundSize, setFormBackGroundSize] = useState('')
    const { status, error, periodStart, periodEnd } = saturationPeriodReport
    const userIsAdmin = useAppSelector(
        (state) => state.user.role === Roles.admin
    )
    const {
        lessCouriers,
        moreOrders,
        lessCouriersAndMoreOrders,
        betterThanD7,
    } = saturationPeriodReport.sortedReportBySaturationReason

    function selectChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
        const name = e.target.name
        if (name === PeriodSelectors.start) {
            dispatch(
                setPeriodOfReport({
                    periodStart: e.target.value.substr(0, 2),
                    periodEnd: periodEnd,
                })
            )
        } else if (name === PeriodSelectors.end) {
            dispatch(
                setPeriodOfReport({
                    periodStart: periodStart,
                    periodEnd: e.target.value.substr(0, 2),
                })
            )
        }
    }

    function sendRequestForReport() {
        dispatch(
            getSaturationReport({
                periodStart: periodStart,
                periodEnd: periodEnd,
            })
        )
    }

    useEffect(() => {
        if (status === StateStatus.success) {
            setFormBackGround(`url(${FRANKS_SUCCESS_GIF})`)
            setFormBackGroundSize('15%')
        } else if (status === 'loading') {
            setFormBackGround(`url(${JOJO_LOADER})`)
            setFormBackGroundSize('20%')
        } else if (status === 'error') {
            setFormBackGround(`url(${ERROR_ANIME_GIF})`)
        }
    }, [status])

    const [animation, setanimation] = useState<
        AnimationControls | TargetAndTransition | VariantLabels | boolean
    >({ y: 0 })

    const defaultPlace = { y: 0 }
    const bottomHidden = { y: 550 }
    useEffect(() => {
        status === StateStatus.success && setanimation(defaultPlace)
        status === StateStatus.loading && setanimation(bottomHidden)
    }, [status])

    return (
        <Flex
            direction={'column'}
            align={'center'}
            margin={'4% auto'}
            width="90%"
        >
            <ReportPeriodSelectCard
                formBackGround={formBackGround}
                formBackGroundSize={formBackGroundSize}
                periodStart={periodStart}
                periodEnd={periodEnd}
                slotsRegular={slotsRegular}
                status={status}
                selectChangeHandler={selectChangeHandler}
                sendRequestForReport={sendRequestForReport}
            />
            <motion.div
                initial={StateStatus.success ? defaultPlace : bottomHidden}
                animate={animation}
                transition={transitionForElements}
                style={{
                    width: '50%',
                    margin: '10em 0 0 20em',
                }}
            >
                <Flex direction={'column'}>
                    {lessCouriers.length > 0 && (
                        <Flex wrap={'wrap'}>
                            <Title
                                margin={'10px 0px'}
                                fWeight={'700'}
                            >{`Апдейт по сатурации с ${periodStart}:00 по ${periodEnd}:00`}</Title>
                            <div> </div>
                            <Flex
                                wrap={'wrap'}
                                border={'2px solid white'}
                                justify={'space-evenly'}
                                align={'stretch'}
                                padding={'10px'}
                                bRadius={'10px'}
                                bFilter={'blur(2px)'}
                                margin={'10px 0px'}
                            >
                                <TextContent fSize={'1.3em'} fWeight={'800'}>
                                    Уменьшилось количество активных курьеров в
                                    разрезе с прошлой неделей:
                                </TextContent>
                                <div> </div>
                                {lessCouriers.map((onionReport, id) => (
                                    <OnionSaturationCard
                                        {...onionReport}
                                        userIsAdmin={userIsAdmin}
                                        key={id}
                                    />
                                ))}
                            </Flex>
                        </Flex>
                    )}
                </Flex>
                <Flex>
                    {moreOrders.length > 0 && (
                        <Flex
                            wrap={'wrap'}
                            border={'2px solid white'}
                            justify={'space-evenly'}
                            align={'stretch'}
                            padding={'10px'}
                            bRadius={'10px'}
                            bFilter={'blur(2px)'}
                            margin={'10px 0px'}
                        >
                            <TextContent fSize={'1.3em'} fWeight={'800'}>
                                Прирост количества заказов в разрезе с прошлой
                                неделей:
                            </TextContent>
                            <div> </div>
                            {moreOrders.map((onionReport, id) => (
                                <OnionSaturationCard
                                    {...onionReport}
                                    userIsAdmin={userIsAdmin}
                                    key={id}
                                />
                            ))}
                        </Flex>
                    )}
                </Flex>
                <Flex>
                    {lessCouriersAndMoreOrders.length > 0 && (
                        <Flex
                            wrap={'wrap'}
                            border={'2px solid white'}
                            justify={'space-evenly'}
                            align={'stretch'}
                            padding={'10px'}
                            bRadius={'10px'}
                            bFilter={'blur(2px)'}
                            margin={'10px 0px'}
                        >
                            <TextContent fSize={'1.3em'} fWeight={'800'}>
                                Прирост заказов и уменьшилось количество
                                активных курьеров в сравнении с прошлой неделей:
                            </TextContent>
                            <div> </div>
                            {lessCouriersAndMoreOrders.map(
                                (onionReport, id) => (
                                    <OnionSaturationCard
                                        {...onionReport}
                                        userIsAdmin={userIsAdmin}
                                        key={id}
                                    />
                                )
                            )}
                        </Flex>
                    )}
                </Flex>
                <Flex>
                    {betterThanD7.length > 0 && (
                        <Flex
                            wrap={'wrap'}
                            border={'2px solid white'}
                            justify={'space-evenly'}
                            align={'stretch'}
                            padding={'10px'}
                            bRadius={'10px'}
                            bFilter={'blur(2px)'}
                            margin={'10px 0px'}
                        >
                            <TextContent fSize={'1.3em'} fWeight={'800'}>
                                Ситуация улучшилась относительно D-7:
                            </TextContent>
                            <div> </div>
                            {betterThanD7.map((onionReport, id) => (
                                <OnionSaturationCard
                                    {...onionReport}
                                    userIsAdmin={userIsAdmin}
                                    key={id}
                                    forAutoReport={true}
                                />
                            ))}
                        </Flex>
                    )}
                </Flex>
            </motion.div>
        </Flex>
    )
}
