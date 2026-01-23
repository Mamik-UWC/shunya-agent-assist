import { apiClient } from "./client";

// Request interceptor
export function setupRequestInterceptor() {
  // Add auth tokens, tenant headers, etc.
  // This is a placeholder - actual implementation will depend on auth strategy
}

// Response interceptor
export function setupResponseInterceptor() {
  // Handle errors, refresh tokens, etc.
  // This is a placeholder - actual implementation will depend on auth strategy
}

// Initialize interceptors
export function initializeInterceptors() {
  setupRequestInterceptor();
  setupResponseInterceptor();
}
