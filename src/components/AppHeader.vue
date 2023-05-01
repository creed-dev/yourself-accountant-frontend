<template>
  <q-header class="flex justify-end gap-4 p-3 bg-slate-100">
    <template v-if="!user">
      <q-btn
        color="primary"
        label="Регистрация"
        @click="showModal(signEnum.SignUp)"
      />

      <q-btn
        color="secondary"
        label="Вход"
        @click="showModal(signEnum.SignIn)"
      />
    </template>

    <template v-else>
      <RouterLink to="/dashboard" v-if="!onDashboardPage">
        <q-btn color="primary" label="Панель" />
      </RouterLink>
      <q-btn color="red" label="Выход" @click="signOut()" />
    </template>
  </q-header>
</template>

<script setup lang="ts">
import SignDialog from '@/components/SignDialog.vue';
import { useQuasar } from 'quasar';
import { Sign } from '@/enums/sign';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { RouteName } from '@/router/router-name.enum';
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';

const quasar = useQuasar();
const authStore = useAuthStore();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const router = useRouter();
const route = useRoute();

const signEnum = Sign;

const onDashboardPage = computed(() => {
  return route.path.includes('dashboard');
});

function showModal(action: string) {
  quasar.dialog({
    component: SignDialog,
    componentProps: { action },
  });
}

function signOut() {
  authStore.deleteBearerToken();
  userStore.deleteUser();
  router.push({ name: RouteName.Home });
}
</script>
