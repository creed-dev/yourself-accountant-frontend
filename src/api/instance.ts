import axios, { AxiosError } from 'axios';
import { Dialog, Notify } from 'quasar';
import SignDialog from '@/layouts/components/SignDialog.vue';
import { Sign } from '@/layouts/enums/sign';
import type { BackendError } from '@/interfaces/backend-error';

export default () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('bearerToken')}`,
    },
  });

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error: AxiosError<BackendError>) {
      if (error.response?.status === 401) {
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
  );

  return instance;
};
