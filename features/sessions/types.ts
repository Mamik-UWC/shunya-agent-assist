export interface Session {
  id: string;
  agentId: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  status: "active" | "completed" | "cancelled";
}
