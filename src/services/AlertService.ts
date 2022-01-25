import { toast, ToastOptions } from 'react-toastify'
import { ToastPromiseParams } from 'react-toastify/dist/core'

export default class AlertService {
    styleForToast: ToastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
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
        promise: Promise<T> | (() => Promise<T>),
        params: ToastPromiseParams,
        options?: ToastOptions
    ) {
        const styleWithoptions = { ...this.styleForToast, ...options }
        toast.promise(promise, params, styleWithoptions)
    }
}

export const alertService = new AlertService()
