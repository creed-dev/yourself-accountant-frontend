import type { User } from '@/models/user.interface';

export interface Debt {
  id?: number;
  user?: User;
  name: string;
  amount: number;
  type: number;
  date: string;
  createdAt?: Date;
}
