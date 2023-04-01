import { useAuthStore } from "@/stores/auth.store";
import { storeToRefs } from "pinia";
import { RouterName } from "@/enums/router-name.enum";

const dashboardGuard = () => {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  if (!user.value) {
    return { name: RouterName.HOME };
  }
};

export default { dashboardGuard };
