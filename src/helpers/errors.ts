import { Notify } from 'quasar';
import type { BackendError } from '@/models/backend-error.interface';
import type { AxiosError } from 'axios';

function notifyBackendError(error: AxiosError<BackendError>) {
  if (Array.isArray(error.response?.data.message)) {
    error.response?.data.message.forEach((item: string) => {
      Notify.create({
        type: 'negative',
        message: item,
        position: 'top-right',
      });
    });
  } else {
    Notify.create({
      type: 'negative',
      message: error.response?.data.message,
      position: 'top-right',
    });
  }
}

export default { notifyBackendError };
