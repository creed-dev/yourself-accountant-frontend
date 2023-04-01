<template>
  <AppLayout>
    <RouterView></RouterView>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import { useAuthStore } from "@/stores/auth.store";
import AuthApi from "@/api/auth.api";
import { storeToRefs } from "pinia";
import Errors from "@/helpers/errors";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

if (authStore.bearerToken) {
  getUser();
}

async function getUser() {
  try {
    const me = await AuthApi.me();
    user.value = me.data;
  } catch (error: any) {
    Errors.notifyBackendError(error.response.data.message);
  }
}
</script>
