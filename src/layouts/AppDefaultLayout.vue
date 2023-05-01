<template>
  <q-layout>
    <DefaultHeader></DefaultHeader>

    <slot />
  </q-layout>
</template>

<script setup lang="ts">
import DefaultHeader from '@/layouts/components/AppHeader.vue';
</script>
