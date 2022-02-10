import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from 'hooks'
import { getActiveScheduleDates } from 'store/slices/onions/slots/onionsSlotsSlice'
import { Flex, GlovoColors } from 'components/styled'
import OnionSlotsUpdateCard from 'pages/onions/slots/cards/SlotsUpdate'
import { FooterSlider } from 'components/animated/FooterSlider'
import { SiGooglesheets } from 'react-icons/si'

export default function Slots() {
    const dispatch = useAppDispatch()
    const { activeScheduleDates } = useAppSelector((state) => state.onionsSlots)
    const theme = useAppSelector((state) => state.theme.theme)

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
            <motion.div
                initial={{ y: -2000 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.9, type: 'spring' }}
                style={{
                    width: '75%',
                    position: 'fixed',
                    top: '50%',
                }}
            >
                <OnionSlotsUpdateCard />
            </motion.div>

            <FooterSlider
                href={
                    process.env
                        .REACT_APP_GOOGLE_SPREADSHEET_ACTIONS_COORDINATION_SHEET_LINK!
                }
                icon={<SiGooglesheets size={35} fill={GlovoColors.green} />}
                title={'Logs'}
                theme={theme}
            />
        </Flex>
    )
}
