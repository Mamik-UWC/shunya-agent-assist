export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiRequestOptions {
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
}
