<template>
  <AppLayout>
    <RouterView></RouterView>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { useAuthStore } from '@/stores/auth';
import AuthApi from '@/api/auth.api';
import { useUserStore } from '@/stores/user';

const authStore = useAuthStore();
const userStore = useUserStore();

if (authStore.bearerToken) {
  getUser();
}

function getUser() {
  AuthApi.me().then((res) => {
    userStore.setUser(res.data);
  });
}
</script>
