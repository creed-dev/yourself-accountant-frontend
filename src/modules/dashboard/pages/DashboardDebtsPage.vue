<template>
  <div class="flex justify-between">
    <DebtsCard :debt-type="debtTypeEnum.ToMe"></DebtsCard>
    <DebtsCard :debt-type="debtTypeEnum.FromMe"></DebtsCard>
  </div>
</template>
<script setup lang="ts">
import DebtsCard from '@/modules/dashboard/components/DebtsCard.vue';
import { DebtType } from '@/modules/dashboard/enums/debt-type.enum';

const debtTypeEnum = DebtType;
</script>
