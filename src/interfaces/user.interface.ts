import type { Debt } from '@/interfaces/debt.interface';

export interface User {
  id: number;
  email: string;
  debts: Debt[];
  createdAt: string;
}
