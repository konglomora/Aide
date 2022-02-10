import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'
import { getActiveScheduleDates } from 'store/slices/onions/slots/onionsSlotsSlice'
import { Flex, GlovoColors } from 'components/styled'
import OnionSlotsUpdateCard from 'pages/onions/slots/cards/SlotsUpdate'
import { FooterSlider } from 'components/animated/FooterSlider'
import { SiGooglesheets } from 'react-icons/si'
import { useLocation } from 'react-router-dom'
import { capitalizeFirstLetter } from 'helpers/strings'
import FallingCard from 'components/animated/FallingCard'

export default function Slots() {
    const dispatch = useAppDispatch()
    const { activeScheduleDates } = useAppSelector((state) => state.onionsSlots)
    const theme = useAppSelector((state) => state.theme.theme)
    const url = useLocation()
    const path: string[] = url.pathname.split('/')
    const logTitle = capitalizeFirstLetter(path[path.length - 1])

    useEffect(() => {
        ;(async () => {
            await dispatch(getActiveScheduleDates())
            console.log(
                '[SlotsPage] OnionScheduleActiveDates(KIE):',
                activeScheduleDates
            )
        })()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    return (
        <Flex
            direction="column"
            width="100%"
            margin="5em 0 0 13em"
            height="91vh"
            justify="center"
            align="center"
        >
            <FallingCard
                style={{
                    width: '75%',
                    position: 'fixed',
                    top: '40%',
                }}
            >
                <OnionSlotsUpdateCard />
            </FallingCard>

            <FooterSlider
                href={
                    process.env
                        .REACT_APP_GOOGLE_SPREADSHEET_SCHEDULE_ACTIONS_LOG_SHEET_LINK!
                }
                icon={<SiGooglesheets size={35} fill={GlovoColors.green} />}
                title={`${logTitle} log`}
                theme={theme}
            />
        </Flex>
    )
}
