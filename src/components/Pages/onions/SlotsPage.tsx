import Button from 'components/StyledComponents/Button'
import { Flex } from 'components/StyledComponents/Flex'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { axiosGetGlovoApiRefreshToken } from 'store/slices/onionsSlotsSlice'

export default function Slots() {
    const dispatch = useAppDispatch()
    const { glovoAdminHeaders } = useAppSelector((state) => state.onionsSlots)
    useEffect(() => {
        dispatch(axiosGetGlovoApiRefreshToken('_'))
        console.log('SlotsPage', glovoAdminHeaders)
    }, [])
    return <Flex direction="column" width="100%" margin="5em 0 0 15em"></Flex>
}
