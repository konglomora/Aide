import { toast, ToastOptions, UpdateOptions } from 'react-toastify'

export interface AlertPromiseParams {
    pending?: string | UpdateOptions
    success?: string | UpdateOptions
    error?: string | UpdateOptions
}

export default class AlertService {
    styleForToast: ToastOptions = {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    }

    success(msg: string) {
        toast.success(msg, this.styleForToast)
    }

    error(msg: string) {
        toast.error(msg, this.styleForToast)
    }

    warning(msg: string) {
        toast.warning(msg, this.styleForToast)
    }

    info(msg: string) {
        toast.info(msg, this.styleForToast)
    }

    loading<T>(
        promise: Promise<T> | (() => Promise<T>) | any,
        params: AlertPromiseParams,
        options?: ToastOptions
    ) {
        const styleWithOptions = { ...this.styleForToast, ...options }
        toast.promise(promise, params, styleWithOptions)
    }
}

export const alertService = new AlertService()
