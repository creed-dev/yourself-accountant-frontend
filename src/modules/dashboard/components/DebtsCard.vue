<template>
  <div class="p-3 border-2 border-solid border-slate-200 flex flex-col mb-10">
    <div class="flex-1">
      <h3 class="text-xl mb-3">
        {{ props.debtType === debtTypeEnum.FromMe ? 'Я должен' : 'Мне должны' }}
      </h3>
      <DebtsAddForm :debt-type="props.debtType" />
      <DebtsTable
        :debts="
          props.debtType === debtTypeEnum.FromMe ? fromMeDebts : toMeDebts
        "
      ></DebtsTable>
    </div>
    <p class="text-lg font-bold">
      Итого:
      <span
        :class="{
          'text-secondary': props.debtType === debtTypeEnum.ToMe,
          'text-deep-orange': props.debtType === debtTypeEnum.FromMe,
        }"
      >
        {{ props.debtType === debtTypeEnum.FromMe ? fromMeSum : toMeSum }}
      </span>
    </p>
  </div>
</template>
<script setup lang="ts">
import DebtsAddForm from '@/modules/dashboard/components/DebtsAddForm.vue';
import DebtsTable from '@/modules/dashboard/components/DebtsTable.vue';
import { DebtType } from '@/modules/dashboard/enums/debt-type.enum';
import { useDebtsStore } from '@/stores/debts.store';
import { storeToRefs } from 'pinia';

interface Props {
  debtType: number;
}

const props = defineProps<Props>();
const debtsStore = useDebtsStore();
const { fromMeDebts, fromMeSum, toMeDebts, toMeSum } = storeToRefs(debtsStore);

const debtTypeEnum = DebtType;
</script>
