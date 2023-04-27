import { storeToRefs } from 'pinia';
import { RouteName } from '@/router/router-name.enum';
import { useUserStore } from '@/stores/user.store';

const dashboardGuard = () => {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);

  if (!user.value) {
    return { name: RouteName.HOME };
  }
};

export default { dashboardGuard };
