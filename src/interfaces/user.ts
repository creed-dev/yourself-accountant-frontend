import type { Debt } from '@/interfaces/debt';

export interface User {
  id: number;
  email: string;
  debts: Debt[];
  createdAt: string;
}
