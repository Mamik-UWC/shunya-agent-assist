export type UserRole = "agent" | "manager" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions?: string[];
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
  refreshToken?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  tenantId?: string;
}
