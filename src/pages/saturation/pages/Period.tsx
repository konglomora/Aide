import { useEffect, useState } from 'react'
import { slotsRegular } from 'helpers/slots'
import { Flex } from 'components/styled'
import {
    getSaturationReport,
    setPeriodOfReport,
} from 'store/slices/saturation/saturationPeriodReportSlice'
import { useAppDispatch, useAppSelector } from 'hooks'

import FRANKS_SUCCESS_GIF from 'assets/aide/gif/franks-dance.gif'
import JOJO_LOADER from 'assets/aide/gif/jojo-loader.gif'
import ERROR_ANIME_GIF from 'assets/aide/gif/500-error.gif'
import EMPTY from 'assets/aide/gif/anime-i-dont-know.gif'
import { Roles } from 'pages/authentication/userRoles'
import { StateStatus } from 'store/helpers/Status'
import {
    PeriodSelectors,
    ReportPeriodSelectCard,
} from '../cards/ReportPeriodSelect'
import { ReportSlider } from 'components/animated'
import { SaturationReasonAnalysis } from '../cards/SaturationReasonAnalysis'
import TitleWrapper from 'components/styled/TitleWrapper'

const SaturationByPeriodPage = () => {
    const dispatch = useAppDispatch()
    const {
        status,
        periodStart,
        periodEnd,
        sortedReportBySaturationReason,
        reportIsEmpty,
    } = useAppSelector((state) => state.saturationPeriodReport)
    const theme = useAppSelector((state) => state.theme.theme)
    const [formBackGround, setFormBackGround] = useState('')
    const [formBackGroundSize, setFormBackGroundSize] = useState('')

    const {
        lessCouriers,
        moreOrders,
        lessCouriersAndMoreOrders,
        betterThanD7,
    } = sortedReportBySaturationReason

    const userIsAdmin = useAppSelector(
        (state) => state.user.role === Roles.admin
    )

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
        if (status === StateStatus.success && !reportIsEmpty) {
            setFormBackGround(`url(${FRANKS_SUCCESS_GIF})`)
            setFormBackGroundSize('15%')
        } else if (status === 'loading') {
            setFormBackGround(`url(${JOJO_LOADER})`)
            setFormBackGroundSize('15%')
        } else if (status === 'error') {
            setFormBackGround(`url(${ERROR_ANIME_GIF})`)
        } else if (reportIsEmpty) {
            console.log('ERROR_ANIME_GIF')
            setFormBackGround(`url(${EMPTY})`)
            setFormBackGroundSize('6%')
        }
    }, [status, reportIsEmpty])

    return (
        <Flex
            direction={'column'}
            align={'center'}
            justify="center"
            margin={'4em 0 0 12em'}
            width="100%"
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
                reportIsEmpty={reportIsEmpty}
            />
            <ReportSlider
                status={status}
                style={{
                    width: '60%',
                    margin: '4em 0  0 0',
                }}
            >
                <TitleWrapper
                    titleText={`Saturation report from ${periodStart}:00 to ${periodEnd}:00`}
                    theme={theme}
                />
                <SaturationReasonAnalysis
                    theme={theme}
                    analysis={lessCouriers}
                    reasonTitle="The number of glovers has decreased"
                />
                <SaturationReasonAnalysis
                    theme={theme}
                    analysis={moreOrders}
                    reasonTitle="The number of orders has increased"
                />
                <SaturationReasonAnalysis
                    theme={theme}
                    analysis={lessCouriersAndMoreOrders}
                    reasonTitle="The number of orders has increased and the
                                number of glovers has decreased"
                />
                <SaturationReasonAnalysis
                    theme={theme}
                    analysis={betterThanD7}
                    reasonTitle=" Scores improved relative to D-7:"
                />
            </ReportSlider>
        </Flex>
    )
}

export default SaturationByPeriodPage
