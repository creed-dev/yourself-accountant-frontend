<template>
  <AppLayout>
    <RouterView></RouterView>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { useAuthStore } from '@/stores/auth';
import AuthApi from '@/api/auth.api';
import Errors from '@/helpers/errors';
import { useUserStore } from '@/stores/user';

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
