import type { VueElement } from 'vue';
import type { AppLayout } from '@/modules/app/layouts/app-layouts.enum';

declare module 'vue-router' {
  interface RouteMeta {
    layout?: AppLayout;
    layoutComponent?: VueElement;
  }
}
