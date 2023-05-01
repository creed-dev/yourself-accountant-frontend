<template>
  <div class="flex justify-between">
    <DebtsCard :debt-type="debtTypeEnum.ToMe"></DebtsCard>
    <DebtsCard :debt-type="debtTypeEnum.FromMe"></DebtsCard>
  </div>
</template>
<script setup lang="ts">
import DebtsCard from '@/modules/dashboard/modules/debts/components/DebtsCard.vue';
import { DebtType } from '@/modules/dashboard/modules/debts/enums/debt-type';

const debtTypeEnum = DebtType;
</script>
