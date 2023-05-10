import { BaseApi } from '@/api/base.api';
import type { Debt } from '@/interfaces/debt';

class DebtsApi extends BaseApi<Debt> {
  protected url = 'debts';
}

export default new DebtsApi();
