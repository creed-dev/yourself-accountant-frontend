import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';
import type { User } from '@/interfaces/user.interface';
import { useDebtsStore } from '@/stores/debts.store';

export const useUserStore = defineStore('user', () => {
  const debtsStore = useDebtsStore();

  const user = ref<User | null>(null);

  const setUser = (item: User) => {
    user.value = item;
    debtsStore.setDebts(item.debts);
  };

  const deleteUser = () => {
    user.value = null;
    debtsStore.setDebts([]);
  };

  return { user: readonly(user), setUser, deleteUser };
});
