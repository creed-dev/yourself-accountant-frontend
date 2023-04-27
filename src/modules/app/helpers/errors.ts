import { Notify, Dialog } from 'quasar';
import type { BackendError } from '@/modules/app/interfaces/backend-error';
import type { AxiosError } from 'axios';
import { ResponseStatusCode } from '@/modules/app/enums/response-status-code';
import SignDialog from '@/modules/app/components/SignDialog.vue';
import { Sign } from '@/modules/app/enums/sign';

function notifyBackendError(error: AxiosError<BackendError>) {
  if (error.response?.data.statusCode === ResponseStatusCode.Unauthorized) {
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
