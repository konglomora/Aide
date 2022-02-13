import { Flex, Button } from 'components/styled'
import dayjs from 'dayjs'
import { alertService } from 'services'
import { useAppDispatch } from 'hooks'
import { IDataForScheduleActionLog } from 'store/slices/sheets/types'
import {
    ActionReasons,
    getConfirmedOnionsCoordination,
    logScheduleActions,
    testSheetFunc,
} from 'store/slices/sheets/logsSlice'
import HeaderSlider from 'components/animated/HeaderSlider'
import { applyConfirmedCoordination } from 'store/slices/weather/actionCoordinationSlice'

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

    const getApprovedCoordinations = () => {
        alertService.loading(
            dispatch(getConfirmedOnionsCoordination({ date: '14.02.2022' })),
            {
                pending: 'Getting approved coordination...',
                success: 'Done!',
                error: 'Rejected',
            }
        )
    }

    const applyCoordination = () => {
        alertService.loading(
            dispatch(applyConfirmedCoordination({ date: '14.02.2022' })),
            {
                pending: 'Applying approved coordination...',
                success: 'Done!',
                error: 'Rejected',
            }
        )
    }

    return (
        <Flex margin=" 0 0 0 22em" width="50%">
            <HeaderSlider>
                <Button onClick={sheetLog}>Log to sheet</Button>
                <Button onClick={showAlert}>Show Alert</Button>
                <Button disabled={true}>Show Alert</Button>
                <Button onClick={getSheetInfo}>Get sheet info</Button>
                {/* <Button onClick={getApprovedCoordinations}>
                    Get approved coordination
                </Button> */}
                <Button onClick={applyCoordination}>Apply confirmed</Button>
            </HeaderSlider>
        </Flex>
    )
}

export default Experiments
