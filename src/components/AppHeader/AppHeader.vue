<template>
  <header class="flex justify-end gap-4 p-3 bg-slate-100 mb-4">
    <app-button :color="'secondary'">Sign In</app-button>
    <app-button :color="'primary'">Sign Up</app-button>
  </header>
</template>

<script setup lang="ts">
import AppButton from "@/ui/AppButton/AppButton.vue";
</script>
