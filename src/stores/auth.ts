import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const bearerToken = ref<string>(localStorage.getItem('bearerToken') || '');

  const setBearerToken = (token: string) => {
    bearerToken.value = token;
    localStorage.setItem('bearerToken', token);
  };

  const deleteBearerToken = () => {
    bearerToken.value = '';
    localStorage.removeItem('bearerToken');
  };

  return {
    bearerToken: readonly(bearerToken),
    setBearerToken,
    deleteBearerToken,
  };
});
