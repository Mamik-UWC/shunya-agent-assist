export interface PostCallData {
  sessionId: string;
  summary?: string;
  keyMoments?: KeyMoment[];
  transcript?: string;
  complianceReport?: ComplianceReport;
  metadata?: {
    duration?: number;
    startTime?: string;
    endTime?: string;
    agentName?: string;
    customerName?: string;
  };
}

export interface KeyMoment {
  timestamp: number;
  description: string;
  type: "positive" | "negative" | "neutral" | "upsell" | "complaint";
}

export interface ComplianceReport {
  status: "compliant" | "non-compliant";
  issues?: string[];
}
