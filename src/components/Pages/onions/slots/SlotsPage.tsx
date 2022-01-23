import Button from 'components/StyledComponents/Button'
import { Flex } from 'components/StyledComponents/Flex'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
    axiosGetGlovoApiRefreshToken,
    getActiveScheduleDates,
} from 'store/slices/onionsSlotsSlice'

import OnionSlotsUpdateCard from './OnionSlotsUpdateCard'

export default function Slots() {
    const dispatch = useAppDispatch()
    const { glovoAdminHeaders, activeScheduleDates } = useAppSelector(
        (state) => state.onionsSlots
    )

    useEffect(() => {
        ;(async () => {
            await dispatch(axiosGetGlovoApiRefreshToken('_'))
            await dispatch(getActiveScheduleDates())
            console.log('[SlotsPage] glovoAdminHeaders:', glovoAdminHeaders)
            console.log(
                '[SlotsPage] OnionScheduleActiveDates(KIE):',
                activeScheduleDates
            )
        })()
    }, [dispatch])

    return (
        <Flex direction="column" width="100%" margin="15em 0 0 15em">
            <OnionSlotsUpdateCard />
        </Flex>
    )
}
