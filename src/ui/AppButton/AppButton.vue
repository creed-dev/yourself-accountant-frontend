<template>
  <q-btn :label="text" :color="props.color" no-caps />
</template>

<script setup lang="ts">
import { onMounted, ref, useSlots } from "vue";

interface Props {
  color: string;
}

const props: Props = withDefaults(defineProps<Props>(), {
  color: "primary",
});

const slots = useSlots();

let text = ref("");

onMounted(() => {
  text.value = String(slots.default!()[0].children);
});
</script>
