/** Risk level for floor view cards (color-coded border and dot). */
export type FloorRiskLevel = "critical" | "warning" | "normal";

/** Sentiment trend for display (↑, ↓, →). */
export type SentimentTrend = "up" | "down" | "stable";

export interface FloorCall {
  id: string;
  agentId: string;
  agentName: string;
  startTime: string;
  duration: number;
  queue: string;
  intent: string;
  sentimentScore: number;
  sentimentTrend: SentimentTrend;
  riskLevel: FloorRiskLevel;
}

/** One slot per agent: either on a call (active) or idle. */
export interface FloorSlot {
  agentId: string;
  agentName: string;
  status: "active" | "idle";
  call?: FloorCall;
}
