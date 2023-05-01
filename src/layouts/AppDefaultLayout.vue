<template>
  <q-layout>
    <DefaultHeader></DefaultHeader>

    <slot />
  </q-layout>
</template>

<script setup lang="ts">
import DefaultHeader from '@/components/AppHeader.vue';
</script>
