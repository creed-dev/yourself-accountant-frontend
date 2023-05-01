export interface BackendError {
  error: string;
  message: string[] | string;
  statusCode: number;
}
