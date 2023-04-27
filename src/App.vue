<template>
  <AppLayout>
    <RouterView></RouterView>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/modules/app/layouts/AppLayout.vue';
import { useAuthStore } from '@/stores/auth.store';
import AuthApi from '@/api/auth.api';
import Errors from '@/modules/app/helpers/errors';
import { useUserStore } from '@/stores/user.store';

const authStore = useAuthStore();
const userStore = useUserStore();

if (authStore.bearerToken) {
  getUser();
}

async function getUser() {
  try {
    userStore.setUser(await AuthApi.me());
  } catch (error: any) {
    Errors.notifyBackendError(error);
  }
}
</script>
