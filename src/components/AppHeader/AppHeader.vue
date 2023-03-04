<template>
  <header class="flex justify-end gap-4 p-3 bg-slate-100 mb-4">
    <app-button :color="'secondary'" @click="showModal(signEnum.SIGN_IN)">
      Sign In
    </app-button>
    <app-button :color="'primary'" @click="showModal(signEnum.SIGN_UP)">
      Sign Up
    </app-button>
  </header>
</template>

<script setup lang="ts">
import AppButton from "@/ui/AppButton/AppButton.vue";
import SignDialog from "@/components/SignDialog/SignDialog.vue";
import { useQuasar } from "quasar";
import { SignEnum } from "@/enums/sign.enum";

const quasar = useQuasar();

const signEnum = SignEnum;

const showModal = (action: string) => {
  quasar.dialog({
    component: SignDialog,
    componentProps: { action },
  });
};
</script>
