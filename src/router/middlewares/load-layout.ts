import type { RouteLocationNormalized } from 'vue-router';
import { AppLayoutToFileMap } from '@/layouts/layouts.types';
import { AppLayout } from '@/layouts/app-layouts.enum';

export async function loadLayout(
  route: RouteLocationNormalized
): Promise<void> {
  const { layout } = route.meta;
  const normalizedLayoutName = layout || AppLayout.Default;
  const fileName = AppLayoutToFileMap[normalizedLayoutName];
  const fileNameWithoutExtension = fileName.split('.vue')[0];
  const component = await import(
    `../../layouts/${fileNameWithoutExtension}.vue`
  );

  route.meta.layoutComponent = component.default;
}
