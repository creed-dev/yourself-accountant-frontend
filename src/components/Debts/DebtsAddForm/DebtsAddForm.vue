<template>
  <q-form class="flex gap-3" @submit="onSubmit()">
    <q-input
      outlined
      type="text"
      v-model="name"
      label="Имя"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Имя обязательно']"
    />

    <q-input
      outlined
      type="text"
      v-model="amount"
      label="Сумма"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0 && val > 0) || 'Сумма обязательна',
      ]"
    />

    <q-input
      outlined
      v-model="date"
      mask="date"
      :rules="[(val) => (val && val.length > 0) || 'Дата обязательна']"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            v-model="showDisplayPopup"
            cover
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              v-model="date"
              minimal
              @update:modelValue="showDisplayPopup = false"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-btn class="h-56" color="secondary" label="Добавить" type="submit" />
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref<string>('');
const date = ref<string>('');
const amount = ref<string>('');
const showDisplayPopup = ref<boolean>(false);

function onSubmit() {
  console.log(name.value);
  console.log(new Date(date.value));
  console.log(amount.value);
}
</script>

<style lang="scss">
.h-56 {
  height: 56px;
}
</style>
