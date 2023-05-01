import type { RouteLocationNormalized } from 'vue-router';
import { AppLayoutToFileMap } from '@/layouts/layouts.types';
import { AppLayout } from '@/layouts/enums/app-layouts';

export async function loadLayout(
  route: RouteLocationNormalized
): Promise<void> {
  const { layout } = route.meta;
  const fileName = AppLayoutToFileMap[layout || AppLayout.Default];
  const component = await import(`../../layouts/${fileName}`);

  route.meta.layoutComponent = component.default;
}
