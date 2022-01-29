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

    success(msg: string, options?: ToastOptions) {
        const styleWithOptions = { ...this.styleForToast, ...options }
        toast.success(msg, styleWithOptions)
    }

    error(msg: string, options?: ToastOptions) {
        const styleWithOptions = { ...this.styleForToast, ...options }
        toast.error(msg, styleWithOptions)
    }

    warning(msg: string, options?: ToastOptions) {
        const styleWithOptions = { ...this.styleForToast, ...options }
        toast.warning(msg, styleWithOptions)
    }

    info(msg: string, options?: ToastOptions) {
        const styleWithOptions = { ...this.styleForToast, ...options }
        toast.info(msg, styleWithOptions)
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
