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
import { useRouter } from "vue-router";
import { ResponseStatusCode } from "@/enums/response-status-code.enum";
import SignDialog from "@/components/SignDialog/SignDialog.vue";
import { useQuasar } from "quasar";
import { SignEnum } from "@/enums/sign.enum";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const router = useRouter();
const quasar = useQuasar();

if (authStore.bearerToken) {
  getUser();
}

async function getUser() {
  try {
    const me = await AuthApi.me();
    user.value = me.data;
  } catch (error: any) {
    if (error.response.data.statusCode === ResponseStatusCode.UNAUTHORIZED) {
      await router.push("/");

      quasar.dialog({
        component: SignDialog,
        componentProps: {
          action: SignEnum.SIGN_IN,
        },
      });
    }
  }
}
</script>
