import {toast} from 'sonner'

export function useNotifyToast() {
    const interactiveToast = (
        message: string,
        {
            action,
            cancel,
            duration,
        }: {
            action?: { label: string; onClick: () => void }
            cancel?: { label: string; onClick: () => void }
            duration?: number
        },
    ) => {
        toast(message, {
            action,
            cancel,
            duration,
        })
    }

    const successToast = (message: string) => toast.success(message)

    const errorToast = (err: unknown) => {
        let msg = 'Something went wrong'

        if (typeof err === 'string') {
            msg = err
        } else if (err instanceof Error) {
            msg = err.message
        } else if ((err as any)?.message) {
            msg = (err as any).message
        }

        toast.error(msg)
    }

    return {interactiveToast, successToast, errorToast}
}
