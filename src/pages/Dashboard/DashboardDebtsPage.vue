<template>
  <div class="flex justify-between">
    <DebtsCard :debt-type="debtTypeEnum.ToMe"></DebtsCard>
    <DebtsCard :debt-type="debtTypeEnum.FromMe"></DebtsCard>
  </div>
</template>
<script setup lang="ts">
import DebtsCard from '@/components/Debts/DebtsCard.vue';
import { DebtType } from '@/enums/debt-type.enum';

const debtTypeEnum = DebtType;
</script>
