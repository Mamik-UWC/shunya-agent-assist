export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}
