import Button from 'components/StyledComponents/Button'
import { Flex } from 'components/StyledComponents/Flex'
import dayjs from 'dayjs'
import React from 'react'
import { useAppDispatch } from 'store/hooks'
import {
    IDataForScheduleActionLog,
    logScheduleActionToSheet,
} from 'store/slices/onionsSlotsSlice'

const Experiments = () => {
    const dispatch = useAppDispatch()

    const sheetLog = () => {
        const data: IDataForScheduleActionLog = {
            actionTime: dayjs().format('HH:mm:ss DD.MM.YY'),
            userName: 'Test Developer',
            onionCode: 'VYS',
            period: '16-00',
            bonusSize: 13,
            bonusType: 'BW',
            capacityPercentage: 13,
            dateOfSchedule: dayjs().format('HH:mm:ss DD.MM.YY'),
        }

        dispatch(logScheduleActionToSheet(data))
    }

    return (
        <Flex direction="column" width="100%" margin="15em 0 0 15em">
            <Button onClick={sheetLog}>Log to sheet</Button>
        </Flex>
    )
}

export default Experiments
