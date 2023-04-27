<template>
  <q-form class="flex gap-3 mb-3" ref="form" @submit="onSubmit()">
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
      type="number"
      v-model="amount"
      label="Сумма"
      lazy-rules
      :rules="[(val) => (val && val > 0) || 'Сумма обязательна']"
    />

    <q-input
      outlined
      v-model="date"
      mask="date"
      lazy-rules
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
import type { Debt } from '@/interfaces/debt';
import DebtsApi from '@/api/debts.api';
import { useDebtsStore } from '@/stores/debts';
import Errors from '@/modules/app/helpers/errors';
import type { QForm } from 'quasar';

interface Props {
  debtType: number;
}

const props = defineProps<Props>();

const debtsStore = useDebtsStore();

const form = ref<QForm | null>(null);
const name = ref<string | null>(null);
const date = ref<string | null>(null);
const amount = ref<number | null>(null);
const showDisplayPopup = ref<boolean>(false);

async function onSubmit() {
  try {
    const debt: Debt = {
      name: name.value!,
      amount: Number(amount.value),
      date: date.value!.split('/').join('-'),
      type: props.debtType,
    };

    const newDebt = await DebtsApi.createDebt(debt);
    debtsStore.addDebt(newDebt.data);

    clearForm();
  } catch (error: any) {
    Errors.notifyBackendError(error);
  }
}

function clearForm() {
  form.value!.resetValidation();
  name.value = null;
  amount.value = null;
  date.value = null;
}
</script>

<style lang="scss">
.h-56 {
  height: 56px;
}
</style>
