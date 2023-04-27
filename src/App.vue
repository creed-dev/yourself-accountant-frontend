<template>
  <AppLayout>
    <RouterView></RouterView>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/modules/app/layouts/AppLayout.vue';
import { useAuthStore } from '@/stores/auth.store';
import AuthApi from '@/api/auth.api';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { ResponseStatusCode } from '@/modules/app/enums/response-status-code.enum';
import SignDialog from '@/modules/app/components/SignDialog.vue';
import { useQuasar } from 'quasar';
import { SignEnum } from '@/modules/app/enums/sign.enum';
import { RouteName } from '@/router/router-name.enum';
import { useDebtsStore } from '@/stores/debts.store';

const authStore = useAuthStore();
const debtsStore = useDebtsStore();
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
    debtsStore.setDebts(me.data.debts);
  } catch (error: any) {
    if (error.response.data.statusCode === ResponseStatusCode.UNAUTHORIZED) {
      router.push({ name: RouteName.HOME });

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
