import axios from './instance';
import type { Debt } from '@/interfaces/debt';
import type { ChangedValuesForDebtUpdate } from '@/modules/dashboard/modules/debts/interfaces/changed-values-for-debt-update';

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
