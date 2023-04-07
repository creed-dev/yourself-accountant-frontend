<template>
  <q-layout>
    <DefaultHeader></DefaultHeader>
    <q-drawer class="bg-slate-100 p-3" :width="200" v-model="showDrawer">
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(item, index) in menuList" :key="index">
            <q-item
              clickable
              :active="route.name === item.routeName"
              v-ripple
              @click="goToPage(item.routeName)"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                {{ item.label }}
              </q-item-section>
            </q-item>
            <q-separator />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page class="p-3">
        <slot />
      </q-page>
    </q-page-container>
  </q-layout>
  <slot />
</template>

<script setup lang="ts">
import DefaultHeader from '@/components/AppHeader/AppHeader.vue';
import { RouteName } from '@/enums/router-name.enum';
import { useRoute, useRouter } from 'vue-router';

interface MenuItem {
  icon: string;
  label: string;
  routeName?: string;
}

const router = useRouter();
const route = useRoute();

const showDrawer = true;

const menuList: MenuItem[] = [
  {
    icon: 'space_dashboard',
    label: 'Dashboard',
    routeName: RouteName.DASHBOARD_INDEX,
  },
  {
    icon: 'request_quote',
    label: 'Debts',
    routeName: RouteName.DASHBOARD_DEBTS,
  },
];

function goToPage(routeName: string) {
  router.push({ name: routeName });
}
</script>
