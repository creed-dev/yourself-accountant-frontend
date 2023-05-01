import { storeToRefs } from 'pinia';
import { RouteName } from '@/router/router-name.enum';
import { useUserStore } from '@/stores/user';

const main = () => {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);

  if (!user.value) {
    return { name: RouteName.Home };
  }
};

export default { main };
