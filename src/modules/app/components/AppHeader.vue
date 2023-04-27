<template>
  <q-header class="flex justify-end gap-4 p-3 bg-slate-100">
    <template v-if="!user">
      <q-btn
        color="primary"
        label="Sign Up"
        @click="showModal(signEnum.SignUp)"
      />

      <q-btn
        color="secondary"
        label="Sign In"
        @click="showModal(signEnum.SignIn)"
      />
    </template>

    <template v-else>
      <RouterLink to="/dashboard" v-if="!onDashboardPage">
        <q-btn color="primary" label="Dashboard" />
      </RouterLink>
      <q-btn color="red" label="Sign Out" @click="signOut()" />
    </template>
  </q-header>
</template>

<script setup lang="ts">
import SignDialog from '@/modules/app/components/SignDialog.vue';
import { useQuasar } from 'quasar';
import { Sign } from '@/modules/app/enums/sign';
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { RouteName } from '@/router/router-name.enum';
import { computed } from 'vue';
import { useUserStore } from '@/stores/user.store';

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
  router.push({ name: RouteName.HOME });
}
</script>
