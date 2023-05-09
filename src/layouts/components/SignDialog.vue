<template>
  <q-dialog v-model="dialogIsOpen">
    <q-card class="full-width">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ props.action }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md q-pa-md">
          <q-input
            outlined
            type="email"
            v-model="email"
            label="Email *"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Email обязателен']"
          />

          <q-input
            outlined
            type="password"
            v-model="password"
            label="Пароль *"
            lazy-rules
            :rules="[
              (val) => val !== '' || 'Пароль обязателен',
              (val) => val.length >= 6 || 'Минимальное количество символов 6',
            ]"
          />

          <q-input
            v-if="props.action === signEnum.SignUp"
            outlined
            type="password"
            v-model="repeatPassword"
            label="Повторите пароль *"
            lazy-rules
            :error="passwordsMismatch"
            :error-message="'Пароли не совпадают'"
          />

          <q-btn :label="props.action" type="submit" color="primary" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { RouteName } from '@/router/router-name.enum';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { Sign } from '@/layouts/enums/sign';
import AuthApi from '@/api/auth.api';

interface Props {
  action: string;
}

const props: Props = defineProps<Props>();

const quasar = useQuasar();
const router = useRouter();

const authStore = useAuthStore();
const userStore = useUserStore();

const signEnum = Sign;

const email = ref<string>('');
const password = ref<string>('');
const repeatPassword = ref<string>('');
const dialogIsOpen = ref<boolean>(true);

let passwordsMismatch: boolean = false;

if (props.action === signEnum.SignUp) {
  watch(password, (newValue) => {
    passwordsMismatch = !(newValue === repeatPassword.value);
  });

  watch(repeatPassword, (newValue) => {
    passwordsMismatch = !(newValue === password.value);
  });
}

function onSubmit() {
  if (props.action === signEnum.SignUp && !passwordsMismatch) {
    AuthApi.signUp(email.value, password.value).then(() => {
      successRegistered();
    });
  }

  if (props.action === signEnum.SignIn) {
    AuthApi.login(email.value, password.value)
      .then((res) => {
        authStore.setBearerToken(res.data.accessToken);
        return AuthApi.me();
      })
      .then((res) => {
        userStore.setUser(res.data);
        successLogin();
      });
  }
}

function successRegistered() {
  quasar.notify({
    type: 'positive',
    message: 'Вы успешно зарегистрированы',
    position: 'top-right',
  });

  dialogIsOpen.value = false;
}

function successLogin() {
  quasar.notify({
    type: 'positive',
    message: 'Вы успешно вошли в свой аккаунт',
    position: 'top-right',
  });

  dialogIsOpen.value = false;
  router.push({ name: RouteName.DashboardIndex });
}
</script>
