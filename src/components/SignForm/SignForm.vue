<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        outlined
        type="email"
        v-model="email"
        label="Email *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Email is required']"
      />

      <q-input
        outlined
        type="password"
        v-model="password"
        label="Password *"
        lazy-rules
        :rules="[
          (val) => val !== '' || 'Password is required',
          (val) => val.length >= 6 || 'The minimum number of characters is 6',
        ]"
      />

      <q-input
        v-if="props.action === signEnum.SIGN_UP"
        outlined
        type="password"
        v-model="repeatPassword"
        label="Repeat password *"
        lazy-rules
        :error="passwordsMismatch"
        :error-message="'Passwords don\'t match'"
      />

      <q-btn label="Submit" type="submit" color="primary" />
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { SignEnum } from '@/enums/sign.enum';
import AuthApi from '@/api/auth.api';
import Errors from '@/helpers/errors';
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';

interface Props {
  action: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['successRegister', 'successLogin']);

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const signEnum = SignEnum;

const email = ref<string>('');
const password = ref<string>('');
const repeatPassword = ref<string>('');

let passwordsMismatch: boolean = false;

async function onSubmit() {
  if (props.action === signEnum.SIGN_UP && !passwordsMismatch) {
    try {
      await AuthApi.signUp(email.value, password.value);
      emit('successRegister');
    } catch (error: any) {
      Errors.notifyBackendError(error);
    }
  }

  if (props.action === signEnum.SIGN_IN) {
    try {
      const login = await AuthApi.login(email.value, password.value);
      authStore.setBearerToken(login.data.accessToken);
      const me = await AuthApi.me();
      user.value = me.data;
      emit('successLogin');
    } catch (error: any) {
      Errors.notifyBackendError(error);
    }
  }
}

if (props.action === signEnum.SIGN_UP) {
  watch(password, (newValue) => {
    passwordsMismatch = !(newValue === repeatPassword.value);
  });

  watch(repeatPassword, (newValue) => {
    passwordsMismatch = !(newValue === password.value);
  });
}
</script>
