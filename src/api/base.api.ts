import type { AxiosInstance } from 'axios';
import axios from './instance';

export abstract class BaseApi<T> {
  protected url = '';
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios();
  }

  public async create(item: T) {
    return await this.axios.post<T>(`/${this.url}/create`, item);
  }

  public async update(itemId: number, item: T) {
    return await this.axios.patch<T>(`/debts/${itemId}/update`, item);
  }

  public async delete(itemId: number) {
    return await this.axios.delete<T>(`/debts/${itemId}/delete`);
  }
}
