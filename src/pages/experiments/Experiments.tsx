import { Flex, Button } from 'components/styled'
import dayjs from 'dayjs'
import { alertService } from 'services'
import { useAppDispatch } from 'hooks'
import { IDataForScheduleActionLog } from 'store/slices/sheets/types'
import { logScheduleAction } from 'store/slices/sheets/logsSlice'

const Experiments = () => {
    const dispatch = useAppDispatch()

    const sheetLog = async () => {
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

        alertService.loading(dispatch(logScheduleAction(data)), {
            pending: 'Sheet processing',
            success: 'Done!',
            error: 'Rejected',
        })
    }

    const showAlert = () => {
        alertService.success('Experiment success!')
        alertService.error('Experiment error!')
        alertService.warning('Experiment warning!')

        const promise = () => {
            const resolveA = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(() => {
                        console.log('RSLOVED')
                    })
                }, 3000)
            })
            return resolveA
        }
        alertService.loading(promise, {
            pending: 'pending',
            success: 'success!',
            error: 'error',
        })
    }

    return (
        <Flex width="100%" margin="15em 0 0 15em">
            <Button onClick={sheetLog}>Log to sheet</Button>
            <Button onClick={showAlert}>Show Alert</Button>
            <Button disabled={true}>Show Alert</Button>
        </Flex>
    )
}

export default Experiments
