<template>
  <q-layout>
    <DefaultHeader></DefaultHeader>
    <q-drawer class="bg-slate-100 p-3" :width="200" v-model="showDrawer">
      <q-scroll-area class="fit">
        <div
          class="mb-4 last:mb-0"
          v-for="item in navList"
          :key="item.category"
        >
          <div class="text-center mb-2 text-lg">{{ item.category }}</div>
          <template
            v-for="(i, index) in item.items"
            :key="item.category + index"
          >
            <q-list>
              <q-item
                class="flex gap-2 items-center"
                clickable
                :active="route.name === i.routeName"
                v-ripple
                @click="goToPage(i.routeName)"
              >
                <q-icon class="text-2xl" :name="i.icon" />
                <div class="text-base mt-2px">
                  {{ i.label }}
                </div>
              </q-item>
              <q-separator />
            </q-list>
          </template>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page class="p-3">
        <slot />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import DefaultHeader from '@/modules/app/components/AppHeader.vue';
import { RouteName } from '@/router/router-name.enum';
import { useRoute, useRouter } from 'vue-router';
import { DashboardNavCategory } from '@/modules/dashboard/enums/DashboardNavCategory.enum';

interface NavItem {
  category: string;
  items: {
    icon: string;
    label: string;
    routeName: string;
  }[];
}

const router = useRouter();
const route = useRoute();

const showDrawer = true;

const navList: NavItem[] = [
  {
    category: DashboardNavCategory.MAIN,
    items: [
      {
        icon: 'space_dashboard',
        label: 'Панель',
        routeName: RouteName.DASHBOARD_INDEX,
      },
    ],
  },
  {
    category: DashboardNavCategory.DEBTS,
    items: [
      {
        icon: 'request_quote',
        label: 'Мне должны',
        routeName: RouteName.DASHBOARD_DEBTS,
      },
    ],
  },
];

function goToPage(routeName: string) {
  router.push({ name: routeName });
}
</script>

<style lang="scss">
.mt-2px {
  margin-top: 2px;
}
</style>
