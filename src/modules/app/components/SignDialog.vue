<template>
  <q-dialog v-model="dialogIsOpen">
    <q-card class="full-width">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ props.action }} form</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <SignForm
          :action="props.action"
          @successRegister="successRegistered()"
          @successLogin="successLogin()"
        ></SignForm>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import SignForm from '@/modules/app/components/SignForm.vue';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { RouteName } from '@/router/router-name.enum';

interface Props {
  action: string;
}

const props: Props = defineProps<Props>();

const quasar = useQuasar();
const router = useRouter();

let dialogIsOpen = ref<boolean>(true);

function successRegistered() {
  quasar.notify({
    type: 'positive',
    message: 'You are successfully registered, please login',
    position: 'top-right',
  });

  dialogIsOpen.value = false;
}

function successLogin() {
  quasar.notify({
    type: 'positive',
    message: 'You are successfully login',
    position: 'top-right',
  });

  dialogIsOpen.value = false;
  router.push({ name: RouteName.DASHBOARD_INDEX });
}
</script>
