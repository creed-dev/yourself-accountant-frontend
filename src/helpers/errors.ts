import { Notify, Dialog } from 'quasar';
import type { BackendError } from '@/interfaces/backend-error';
import type { AxiosError } from 'axios';
import SignDialog from '@/layouts/components/SignDialog.vue';
import { Sign } from '@/layouts/enums/sign';

function notifyBackendError(error: AxiosError<BackendError>) {
  if (error.response?.data.statusCode === 401) {
    Dialog.create({
      component: SignDialog,
      componentProps: {
        action: Sign.SignIn,
      },
    });
  }

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
