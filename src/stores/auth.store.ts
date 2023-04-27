import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@/interfaces/user.interface';

export const useAuthStore = defineStore('auth', () => {
  const bearerToken = ref<string>(localStorage.getItem('bearerToken') || '');
  const user = ref<User | null>(null);

  const setBearerToken = (token: string) => {
    bearerToken.value = token;
    localStorage.setItem('bearerToken', token);
  };

  const deleteBearerToken = () => {
    bearerToken.value = '';
    localStorage.removeItem('bearerToken');
  };

  return { bearerToken, user, setBearerToken, deleteBearerToken };
});
