import { useEffect, useState } from 'react'
import { slotsRegular } from '../../slots'
import OnionSaturationCard from '../Cards/OnionSaturationCard'
import { Flex } from '../../../../StyledComponents/Flex'
import { Title } from '../../../../StyledComponents/Title'
import Button from '../../../../StyledComponents/Button'
import { SelectStyle } from '../../../../StyledComponents/SelectStyles'
import {
    getSaturationReport,
    setPeriodOfReport,
} from '../../../../../store/slices/saturationPeriodReportSlice'
import TextContent from '../../../../StyledComponents/TextContent'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LoaderReact from '../../../../StyledComponents/LoaderReact'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import FRANKS_SUCCESS_GIF from '../../../../../assets/gif/franks-dance.gif'
import JOJO_LOADER from '../../../../../assets/gif/jojo-loader.gif'
import ERROR_ANIME_GIF from '../../../../../assets/gif/500-error.gif'

export default function SaturationByPeriodPage() {
    const dispatch = useAppDispatch()
    const { saturationPeriodReport } = useAppSelector((state) => state)
    const [formBackGround, setFormBackGround] = useState('')
    const [formBackGroundSize, setFormBackGroundSize] = useState('')
    const { status, error, periodStart, periodEnd } = saturationPeriodReport

    const {
        lessCouriersSaturatedOnions,
        moreOrdersSaturatedOnions,
        lessCouriersAndMoreOrdersSaturatedOnions,
        hasSaturationButBetterThanD7,
    } = saturationPeriodReport.sortedReportBySaturationReason

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

    function sendRequestForReport() {
        dispatch(
            getSaturationReport({
                periodStart: periodStart,
                periodEnd: periodEnd,
            })
        )
    }

    useEffect(() => {
        if (status === 'resolved') {
            setFormBackGround(`url(${FRANKS_SUCCESS_GIF})`)
            setFormBackGroundSize('15%')
        } else if (status === 'loading') {
            setFormBackGround(`url(${JOJO_LOADER})`)
            setFormBackGroundSize('20%')
        } else if (status === 'error') {
            setFormBackGround(`url(${ERROR_ANIME_GIF})`)
        }
    }, [status])

    return (
        <Flex
            direction={'column'}
            align={'center'}
            margin={'4% auto'}
            width="90%"
        >
            <Flex
                justify={'center'}
                padding={'3em 0 2em 0'}
                bBorder={'2px solid white'}
                bFilter={'blur(2px)'}
                height="4%"
                mHeight="3%"
                top="3em"
                left="10em"
                width="100%"
                position="fixed"
                zIndex="2"
                background={formBackGround}
                backSize={formBackGroundSize}
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

            <Flex direction={'column'} width={'50%'} margin="10em 0 0 20em">
                <Flex>
                    {lessCouriersSaturatedOnions.length > 0 && (
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
                                {lessCouriersSaturatedOnions.map(
                                    (onionReport, id) => (
                                        <OnionSaturationCard
                                            {...onionReport}
                                            key={id}
                                        />
                                    )
                                )}
                            </Flex>
                        </Flex>
                    )}
                </Flex>
                <Flex>
                    {moreOrdersSaturatedOnions.length > 0 && (
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
                            {moreOrdersSaturatedOnions.map(
                                (onionReport, id) => (
                                    <OnionSaturationCard
                                        {...onionReport}
                                        key={id}
                                    />
                                )
                            )}
                        </Flex>
                    )}
                </Flex>
                <Flex>
                    {lessCouriersAndMoreOrdersSaturatedOnions.length > 0 && (
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
                            {lessCouriersAndMoreOrdersSaturatedOnions.map(
                                (onionReport, id) => (
                                    <OnionSaturationCard
                                        {...onionReport}
                                        key={id}
                                    />
                                )
                            )}
                        </Flex>
                    )}
                </Flex>
                <Flex>
                    {hasSaturationButBetterThanD7.length > 0 && (
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
                            {hasSaturationButBetterThanD7.map(
                                (onionReport, id) => (
                                    <OnionSaturationCard
                                        {...onionReport}
                                        key={id}
                                        forAutoReport={true}
                                    />
                                )
                            )}
                        </Flex>
                    )}
                </Flex>
            </Flex>
            <Flex
                direction={'column'}
                align={'center'}
                justify="center"
                width="90%"
                margin="0 0 0 10em"
            >
                {status === null && <LoaderReact animate={undefined} />}
                {status === 'loading' && (
                    <LoaderReact animate={{ rotate: 360 }} />
                )}
                {status === 'error' && <h2>An error occurred: {error}</h2>}
            </Flex>
        </Flex>
    )
}
