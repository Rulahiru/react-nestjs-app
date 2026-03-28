import { toast } from 'react-toastify';

export function showErrorToastMsg(message: string) {
    toast.error(message, { hideProgressBar: true });
}

export function showSuccessToastMsg(message: string) {
    toast.success(message, { hideProgressBar: true });
}