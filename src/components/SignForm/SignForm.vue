<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        outlined
        type="email"
        v-model="email"
        label="Email *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Email is required']"
      />

      <q-input
        outlined
        type="password"
        v-model="password"
        label="Password *"
        lazy-rules
        :rules="[
          (val) => val !== '' || 'Password is required',
          (val) => val.length >= 6 || 'The minimum number of characters is 6',
        ]"
      />

      <q-input
        v-if="props.action === signEnum.SIGN_UP"
        outlined
        type="password"
        v-model="repeatPassword"
        label="Repeat password *"
        lazy-rules
        :error="passwordsMismatch"
        :error-message="'Passwords don\'t match'"
      />

      <q-btn label="Submit" type="submit" color="primary" />
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { SignEnum } from "@/enums/sign.enum";

interface Props {
  action: string;
}

const props = defineProps<Props>();

const signEnum = SignEnum;

const email = ref<string>("");
const password = ref<string>("");
const repeatPassword = ref<string>("");

let passwordsMismatch: boolean = false;

function onSubmit() {}

if (props.action === signEnum.SIGN_UP) {
  watch(password, (newValue) => {
    passwordsMismatch = !(newValue === repeatPassword.value);
  });

  watch(repeatPassword, (newValue) => {
    passwordsMismatch = !(newValue === password.value);
  });
}
</script>
