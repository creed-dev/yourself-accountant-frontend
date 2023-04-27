import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';
import { RouteName } from '@/router/router-name.enum';

const dashboardGuard = () => {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  if (!user.value) {
    return { name: RouteName.HOME };
  }
};

export default { dashboardGuard };
