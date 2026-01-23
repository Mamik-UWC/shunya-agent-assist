export interface TenantConfig {
  id: string;
  name: string;
  domain?: string;
  logo?: string;
  theme?: {
    primaryColor?: string;
    sidebarColor?: string;
    backgroundColor?: string;
  };
  features?: {
    [key: string]: boolean;
  };
  settings?: {
    [key: string]: unknown;
  };
  createdAt?: string;
  updatedAt?: string;
}
