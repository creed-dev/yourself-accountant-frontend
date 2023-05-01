import type { VueElement } from 'vue';
import type { AppLayout } from '@/layouts/enums/app-layouts';

declare module 'vue-router' {
  interface RouteMeta {
    layout?: AppLayout;
    layoutComponent?: VueElement;
  }
}
