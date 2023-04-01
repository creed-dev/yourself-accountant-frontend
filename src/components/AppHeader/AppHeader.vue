<template>
  <header class="flex justify-end gap-4 p-3 bg-slate-100 mb-4">
    <template v-if="!user">
      <q-btn
        color="primary"
        label="Sign Up"
        @click="showModal(signEnum.SIGN_UP)"
      />

      <q-btn
        color="secondary"
        label="Sign In"
        @click="showModal(signEnum.SIGN_IN)"
      />
    </template>

    <template v-else>
      <RouterLink to="/dashboard">
        <q-btn color="primary" label="Dashboard" />
      </RouterLink>
      <q-btn color="red" label="Sign Out" @click="signOut()" />
    </template>
  </header>
</template>

<script setup lang="ts">
import SignDialog from "@/components/SignDialog/SignDialog.vue";
import { useQuasar } from "quasar";
import { SignEnum } from "@/enums/sign.enum";
import { useAuthStore } from "@/stores/auth.store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { RouterName } from "@/enums/router-name.enum";

const quasar = useQuasar();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const router = useRouter();

const signEnum = SignEnum;

const showModal = (action: string) => {
  quasar.dialog({
    component: SignDialog,
    componentProps: { action },
  });
};

const signOut = () => {
  authStore.deleteBearerToken();
  user.value = null;
  router.push({ name: RouterName.HOME });
};
</script>
