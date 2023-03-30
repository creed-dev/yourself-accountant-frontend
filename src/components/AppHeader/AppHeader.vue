<template>
  <header class="flex justify-end gap-4 p-3 bg-slate-100 mb-4">
    <template v-if="!user">
      <q-btn
        color="secondary"
        label="Sign In"
        @click="showModal(signEnum.SIGN_IN)"
      />

      <q-btn
        color="primary"
        label="Sign Up"
        @click="showModal(signEnum.SIGN_UP)"
      />
    </template>

    <template v-else>
      <q-btn color="primary" label="Sign Out" @click="signOut()" />
    </template>
  </header>
</template>

<script setup lang="ts">
import SignDialog from "@/components/SignDialog/SignDialog.vue";
import { useQuasar } from "quasar";
import { SignEnum } from "@/enums/sign.enum";
import { useAuthStore } from "@/stores/auth.store";
import { storeToRefs } from "pinia";

const quasar = useQuasar();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

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
};
</script>
