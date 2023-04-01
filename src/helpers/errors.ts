import { Notify } from "quasar";

function notifyBackendError(error: string[]) {
  error.forEach((item: string) => {
    Notify.create({
      type: "negative",
      message: item,
      position: "top-right",
    });
  });
}

export default { notifyBackendError };
