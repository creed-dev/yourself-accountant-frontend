import type { VueElement } from "vue";
import type { AppLayoutsEnum } from "@/enums/appLayouts.enum";

declare module "vue-router" {
  interface RouteMeta {
    layout?: AppLayoutsEnum;
    layoutComponent?: VueElement;
  }
}
