<template>
  <q-dialog>
    <q-card class="full-width">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ props.action }} form</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <SignForm :action="props.action"></SignForm>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import SignForm from "@/components/SignForm/SignForm.vue";

interface Props {
  action: string;
}

const props: Props = defineProps<Props>();
</script>
