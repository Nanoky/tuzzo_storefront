import { enqueueSnackbar } from "notistack";

export function notifyError(message: string) {
    enqueueSnackbar(message, {
        variant: "error",
    });
}

export function notifySuccess(message: string) {
    enqueueSnackbar(message, {
        variant: "success",
    });
}
