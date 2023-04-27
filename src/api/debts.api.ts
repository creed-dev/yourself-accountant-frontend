import axios from './instance.api';
import type { Debt } from '@/models/debt.interface';
import type { ChangedValuesForDebtUpdate } from '@/models/changed-values-for-debt-update.interface';

const createDebt = async (debt: Debt) => {
  return await axios().post<Debt>('/debts/create', debt);
};

const updateDebt = async (
  debtId: number,
  changedValues: ChangedValuesForDebtUpdate
) => {
  return await axios().patch<Debt>(`/debts/update/${debtId}`, changedValues);
};

const deleteDebt = async (debtId: number) => {
  return await axios().delete<Debt>(`/debts/delete/${debtId}`);
};

export default { createDebt, updateDebt, deleteDebt };
