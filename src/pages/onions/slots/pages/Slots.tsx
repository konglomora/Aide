import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from 'hooks'
import { getActiveScheduleDates } from 'store/slices/onions/slots/onionsSlotsSlice'
import { Flex, Icon, AideColors, Title, GlovoColors } from 'components/styled'
import GOOGLE_SHEETS_ICON from 'assets/aide/icons/sheets-icon.svg'
import OnionSlotsUpdateCard from 'pages/onions/slots/cards/SlotsUpdate'
import { Theme } from 'components/themes'

export default function Slots() {
    const dispatch = useAppDispatch()
    const { activeScheduleDates } = useAppSelector((state) => state.onionsSlots)
    const theme = useAppSelector((state) => state.theme.theme)
    const flexHoverColor =
        theme === Theme.aide ? AideColors.orange : GlovoColors.yellow

    const logsBackGround =
        theme === Theme.aide ? AideColors.lightBlack : GlovoColors.white

    const logsColor =
        theme === Theme.aide ? AideColors.white : GlovoColors.darkGrey

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
        <>
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

                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.15, duration: 0.8, type: 'spring' }}
                    style={{
                        width: '100%',
                        position: 'fixed',
                        top: 'auto',
                        bottom: '0',
                    }}
                >
                    <a
                        href={
                            'https://docs.google.com/spreadsheets/d/1-MBftqygEI20x12VuFDm_NGwsfPfDlzZHiAG3H_uKFA/edit#gid=1955477724'
                        }
                        target={'_blank'}
                        style={{ textDecoration: 'none' }}
                        rel="noreferrer"
                    >
                        <Flex
                            height="5em"
                            mHeight="1em"
                            background={logsBackGround}
                            border={`3px solid ${logsColor}`}
                            justify="center"
                            align="center"
                            hoverable={true}
                            hoverColor={flexHoverColor}
                        >
                            <Icon
                                width="35"
                                height="35px"
                                src={GOOGLE_SHEETS_ICON}
                            />
                            <Title
                                fWeight={'600'}
                                height={'28%;'}
                                fSize={'1.5em'}
                                width="2.5em"
                                color={logsColor}
                            >
                                Logs
                            </Title>
                        </Flex>
                    </a>
                </motion.div>
            </Flex>
        </>
    )
}
