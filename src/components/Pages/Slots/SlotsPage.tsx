import { REACT_APP_ONION_SLOTS_LINK } from 'axios/env'
import { Flex } from 'components/StyledComponents/Flex'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { OnionCodes } from '../../../helpers/onionCodes'
import OnionSlotsCard from './OnionSlotCard'

const todayDate: string = dayjs().format('YYYY-MM-DD')
const tomorrowDate: string = dayjs().add(1, 'day').format('YYYY-MM-DD')

export default function Slots() {
    const url = useLocation()
    const navigate = useNavigate()
    const [date, setDate] = useState<string>(todayDate)

    useEffect(() => {
        if (url.pathname === '/slots/today') setDate(todayDate)
        if (url.pathname === '/slots/tomorrow') setDate(tomorrowDate)
        console.log('url.pathname', url.pathname)
        console.log('tomorrowDate', tomorrowDate)
    }, [navigate, url.pathname])
    const kyivSlots = OnionCodes.kyiv.map((code) => {
        return (
            <OnionSlotsCard
                code={code}
                link={`${REACT_APP_ONION_SLOTS_LINK}${code}/${date}`}
            />
        )
    })
    const mioSlots = OnionCodes.mio.map((code) => {
        return (
            <OnionSlotsCard
                code={code}
                link={`${REACT_APP_ONION_SLOTS_LINK}${code}/${date}`}
            />
        )
    })
    const smallSlots = OnionCodes.small.map((code) => {
        return (
            <OnionSlotsCard
                code={code}
                link={`${REACT_APP_ONION_SLOTS_LINK}${code}/${date}`}
            />
        )
    })

    return (
        <Flex direction="column" width="90%" margin="5em 0 0 10em">
            <Flex direction="column" align="center">
                <h1>Kyiv</h1>
                <Flex wrap="wrap" justify="center">
                    {kyivSlots}
                </Flex>
            </Flex>
            <Flex direction="column" align="center">
                <h1>MIO</h1>
                <Flex wrap="wrap" justify="center">
                    {mioSlots}
                </Flex>
            </Flex>
            <Flex direction="column" align="center">
                <h1>Small</h1>
                <Flex wrap="wrap" justify="center" width="70%">
                    {smallSlots}
                </Flex>
            </Flex>
        </Flex>
    )
}
