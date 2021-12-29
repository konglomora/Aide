import { REACT_APP_ONION_SLOTS_LINK } from 'axios/env'
import { Flex } from 'components/StyledComponents/Flex'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { OnionCodes } from '../Reports/onionCodes'
import OnionSlotsCard from './OnionSlotCard'

const todayDate: string = dayjs().format('YYYY-MM-DD')
const tomorrowDate: string = dayjs().add(1, 'day').format('YYYY-MM-DD')

export default function Slots() {
    const url = useLocation()
    const navigate = useNavigate()
    const [date, setDate] = useState<string>(todayDate)

    useEffect(() => {
        if (url.pathname === '/weather/today') setDate(todayDate)
        if (url.pathname === '/weather/tomorrow') setDate(tomorrowDate)
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
            <div>
                <h1>Kyiv</h1>
                {kyivSlots}
            </div>
            <div>
                <h1>MIO</h1>
                {mioSlots}
            </div>
            <div>
                <h1>Small</h1>
                {smallSlots}
            </div>
        </Flex>
    )
}
