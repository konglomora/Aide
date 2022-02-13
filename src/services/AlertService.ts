import { GlovoColors } from 'components/styled'
import { toast, ToastOptions, UpdateOptions } from 'react-toastify'

export interface AlertPromiseParams {
    pending?: string | UpdateOptions
    success?: string | UpdateOptions
    error?: string | UpdateOptions
}

class AlertService {
    styleForToast: ToastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
    }

    success(msg: string, options?: ToastOptions) {
        const styleWithOptions: ToastOptions = {
            ...this.styleForToast,
            ...options,
            style: {
                backgroundColor: GlovoColors.green,
            },
            progressStyle: {
                backgroundColor: GlovoColors.white,
            },
        }
        toast.success(msg, styleWithOptions)
    }

    error(msg: string, options?: ToastOptions) {
        const styleWithOptions = { ...this.styleForToast, ...options }
        toast.error(msg, styleWithOptions)
    }

    warning(msg: string, options?: ToastOptions) {
        const styleWithOptions = {
            ...this.styleForToast,
            ...options,
            style: {
                backgroundColor: GlovoColors.yellow,
            },
            progressStyle: {
                backgroundColor: GlovoColors.white,
            },
        }
        toast.warning(msg, styleWithOptions)
    }

    info(msg: string, options?: ToastOptions) {
        const styleWithOptions = {
            ...this.styleForToast,
            ...options,
        }
        toast.info(msg, styleWithOptions)
    }

    actionStatus(action: string, status: number) {
        const styleWithOptions: ToastOptions = {
            ...this.styleForToast,
            style: {
                backgroundColor: GlovoColors.green,
            },
            progressStyle: {
                backgroundColor: GlovoColors.white,
            },
        }

        status !== 200 &&
            toast.error(`Error while ${action}`, this.styleForToast)
        status === 200 &&
            toast.success(`Successful ${action}`, styleWithOptions)
    }

    loading<T>(
        promise: Promise<T> | (() => Promise<T>) | any,
        params: AlertPromiseParams,
        options?: ToastOptions
    ) {
        const finalParams: AlertPromiseParams = {
            success: {
                render: params.success,
                style: {
                    backgroundColor: GlovoColors.green,
                },
            },
            pending: {
                render: params.pending,
                style: {
                    backgroundColor: GlovoColors.white,
                },
            },
        }
        const styleWithOptions = {
            ...this.styleForToast,
            ...options,
        }
        toast.promise(promise, finalParams, styleWithOptions)
    }
}

const alertService = new AlertService()

export default alertService
