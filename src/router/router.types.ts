import type { VueElement } from 'vue';
import type { AppLayout } from '@/enums/app-layouts.enum';

declare module 'vue-router' {
  interface RouteMeta {
    layout?: AppLayout;
    layoutComponent?: VueElement;
  }
}
