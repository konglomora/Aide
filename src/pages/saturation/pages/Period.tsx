import { useEffect, useState } from 'react'
import { slotsRegular } from 'helpers/slots'
import { Flex, GlovoColors } from 'components/styled'
import {
    getSaturationReport,
    setPeriodOfReport,
} from 'store/slices/saturation/saturationPeriodReportSlice'
import { useAppDispatch, useAppSelector } from 'hooks'
import {
    PeriodSelectors,
    ReportPeriodSelectCard,
} from '../cards/ReportPeriodSelect'
import { ReportSlider } from 'components/animated'
import { SaturationReasonAnalysis } from '../cards/SaturationReasonAnalysis'
import TitleWrapper from 'components/styled/TitleWrapper'
import { Roles } from 'pages/authentication/userRoles'
import { ThemeGif } from 'components/themes'
import { FooterSlider } from 'components/animated/FooterSlider'
import { SiGooglesheets } from 'react-icons/si'
import SaturationModes from '../cards/SaturationModes'

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
        outside,
    } = sortedReportBySaturationReason

    const allowedStaff = useAppSelector(
        (state) =>
            state.user.role === Roles.admin || state.user.role === Roles.manager
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
        const { gif, size } = status
            ? ThemeGif[theme].status[status]
            : { gif: '', size: '' }
        setFormBackGround(gif)
        setFormBackGroundSize(size)

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <SaturationModes />
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
                {allowedStaff && (
                    <SaturationReasonAnalysis
                        theme={theme}
                        analysis={outside}
                        reasonTitle="Saturated onions from outside:"
                    />
                )}
            </ReportSlider>
            <FooterSlider
                href={
                    process.env
                        .REACT_APP_GOOGLE_SPREADSHEET_GLOVO_ONION_SATURATION_MODES_SHEET_LINK!
                }
                icon={<SiGooglesheets size={35} fill={GlovoColors.green} />}
                title={`Saturation modes`}
                theme={theme}
            />
        </Flex>
    )
}

export default SaturationByPeriodPage
