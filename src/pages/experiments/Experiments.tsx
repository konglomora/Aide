import { Flex, Button } from 'components/styled'
import dayjs from 'dayjs'
import { alertService } from 'services'
import { useAppDispatch } from 'hooks'
import { IDataForScheduleActionLog } from 'store/slices/sheets/types'
import {
    ActionReasons,
    logScheduleActions,
    testSheetFunc,
} from 'store/slices/sheets/logsSlice'
import HeaderSlider from 'components/animated/HeaderSlider'
import { applyConfirmedCoordination } from 'store/slices/weather/actionCoordinationSlice'
import { getSaturationModes } from 'store/slices/sheets/modesSlice'

const Experiments = () => {
    const dispatch = useAppDispatch()

    const sheetLog = async () => {
        const logRow: IDataForScheduleActionLog = {
            actionTime: dayjs().format('HH:mm:ss DD.MM.YY'),
            actionReason: ActionReasons.manual,
            userName: 'Test Developer',
            onionCode: 'VYS',
            period: '16-00',
            bonusSize: 13,
            bonusType: 'BW',
            capacityPercentage: 13,
            dateOfSchedule: dayjs().format('HH:mm:ss DD.MM.YY'),
        }

        alertService.loading(dispatch(logScheduleActions([logRow])), {
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

    const getSheetInfo = () => {
        alertService.loading(dispatch(testSheetFunc()), {
            pending: 'Sheet processing',
            success: 'Done!',
            error: 'Rejected',
        })
    }

    const applyCoordination = () => {
        const tomorrowDate = dayjs().format('DD.MM.YYYY')
        alertService.loading(
            dispatch(applyConfirmedCoordination({ date: tomorrowDate })),
            {
                pending: 'Applying approved coordination...',
                success: 'Done!',
                error: 'Rejected',
            }
        )
    }

    const getModes = () => {
        alertService.loading(dispatch(getSaturationModes()), {
            pending: 'Getting saturation modes...',
            success: 'Done!',
            error: 'Rejected',
        })
    }

    return (
        <Flex margin=" 0 0 0 42em" width="70%">
            <HeaderSlider>
                <Button onClick={sheetLog}>Log to sheet</Button>
                <Button onClick={showAlert}>Show Alert</Button>
                <Button disabled={true}>Show Alert</Button>
                <Button onClick={getSheetInfo}>Get sheet info</Button>
                <Button onClick={applyCoordination}>Apply confirmed</Button>
                <Button onClick={getModes} width={'10em'}>
                    Get saturation modes
                </Button>
            </HeaderSlider>
        </Flex>
    )
}

export default Experiments
