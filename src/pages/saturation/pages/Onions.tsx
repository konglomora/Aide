import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { slotsRegular } from 'helpers/slots'
import OnionSaturationCard from '../cards/OnionSaturation'
import { Flex, Title, Button, SelectStyle } from 'components/styled'
import {
    deselectOnion,
    getSaturationReport,
    selectOnion,
    setPeriodOfReport,
} from 'store/slices/saturationSelectedOnionsSlice'
import AreaCodesCard from '../cards/AreaCodes'
import ANIME_SUCCESS_GIF from 'assets/gif/dancing-cute.gif'
import ERROR_ANIME_GIF from 'assets/gif/500-error.gif'
import JOJO_LOADER from 'assets/gif/jojo-loader.gif'
import { Colors } from 'components/styled'
import { useAppSelector } from 'store/hooks'
import { Roles } from 'pages/authentication/userRoles'
import { StateStatus } from 'store/slices/onionsSlotsSlice'

const SaturationBySelectedOnion = () => {
    const dispatch = useDispatch()
    const [formBackGround, setFormBackGround] = useState<string>(Colors.black)
    const [formBackGroundSize, setFormBackGroundSize] = useState('')
    const {
        status,
        periodStart,
        periodEnd,
        kyiv_report,
        mio_report,
        small_report,
        areaCodes,
        selectedOnionCodes,
    } = useAppSelector((state) => state.selectedOnionsReport)

    const userIsAdmin = useAppSelector(
        (state) => state.user.role === Roles.admin
    )

    const saturationReport = [...kyiv_report, ...mio_report, ...small_report]

    function selectChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
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

    function onionCodesSelectHandler(e: React.ChangeEvent<HTMLDivElement>) {
        const onionCode = e.target.outerText
        dispatch(selectOnion(onionCode))
    }

    function onionDeselectHandler(e: React.ChangeEvent<HTMLDivElement>) {
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

    useEffect(() => {
        if (status === StateStatus.success) {
            setFormBackGround(`url(${ANIME_SUCCESS_GIF})`)
            setFormBackGroundSize('20%')
        } else if (status === StateStatus.loading) {
            setFormBackGround(`url(${JOJO_LOADER})`)
            setFormBackGroundSize('20%')
        } else if (status === StateStatus.error) {
            setFormBackGround(`url(${ERROR_ANIME_GIF})`)
        }
    }, [status])

    return (
        <Flex direction="column" width="90%" margin="5em 0 0 10em">
            <Flex
                width="55%"
                align="start"
                margin="2em auto"
                direction="column"
                border="2px solid white"
                bFilter="blur(2px)"
                bRadius={'10px'}
            >
                <Flex
                    direction="row"
                    width="100%"
                    justify="space-evenly"
                    bBorder="2px dashed white"
                >
                    {areaCodes.map((onionCodesArray, index) => {
                        const title =
                            index === 0 ? 'Kyiv' : index === 1 ? 'MIO' : 'Small'
                        return (
                            <AreaCodesCard
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
                    background={formBackGround}
                    backSize={formBackGroundSize}
                >
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
                        onClick={sendRequestForReport}
                        bcolor={'black'}
                        color={'white'}
                        bradius={'10px'}
                        border={'3px solid white'}
                    >
                        Get report
                    </Button>
                </Flex>
            </Flex>

            {status === StateStatus.success && saturationReport.length > 0 && (
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
                    {saturationReport.map((onionReport, id) => (
                        <OnionSaturationCard
                            {...onionReport}
                            userIsAdmin={userIsAdmin}
                            key={id}
                        />
                    ))}
                </Flex>
            )}
        </Flex>
    )
}

export default SaturationBySelectedOnion
