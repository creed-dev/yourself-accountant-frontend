import type { VueElement } from 'vue';
import type { AppLayoutsEnum } from '@/enums/app-layouts.enum';

declare module 'vue-router' {
  interface RouteMeta {
    layout?: AppLayoutsEnum;
    layoutComponent?: VueElement;
  }
}
