import { defineStore } from 'pinia';
import { computed, readonly, ref } from 'vue';
import type { Debt } from '@/interfaces/debt';
import { DebtType } from '@/modules/dashboard/modules/debts/enums/debt-type';

export const useDebtsStore = defineStore('debts', () => {
  const debts = ref<Debt[]>([]);

  const setDebts = (items: Debt[]) => {
    debts.value = items;
  };

  const addDebt = (item: Debt) => {
    debts.value.push(item);
  };

  const updateDebt = (item: Debt) => {
    const debtIxd = debts.value.findIndex((i) => i.id === item.id);
    debts.value[debtIxd] = item;
  };

  const deleteDebt = (item: Debt) => {
    debts.value = debts.value.filter((i) => i.id !== item.id);
  };

  const fromMeDebts = computed(() => {
    return debts.value.filter((item) => item.type === DebtType.FromMe);
  });

  const toMeDebts = computed(() => {
    return debts.value.filter((item) => item.type === DebtType.ToMe);
  });

  const fromMeSum = computed(() => {
    return fromMeDebts.value.reduce(
      (acc, currentValue) => acc + currentValue.amount,
      0
    );
  });

  const toMeSum = computed(() => {
    return toMeDebts.value.reduce(
      (acc, currentValue) => acc + currentValue.amount,
      0
    );
  });

  return {
    debts: readonly(debts),
    setDebts,
    addDebt,
    updateDebt,
    deleteDebt,
    fromMeDebts,
    toMeDebts,
    fromMeSum,
    toMeSum,
  };
});
