import type { Debt } from '@/models/debt.interface';

export interface User {
  id: number;
  email: string;
  debts: Debt[];
  createdAt: string;
}
