export interface BaseEvent {
  type: string;
  timestamp: number;
}

export interface CallUpdateEvent extends BaseEvent {
  type: "call.update";
  data: {
    callId: string;
    duration: number;
    intent?: string;
    sentiment?: "positive" | "neutral" | "negative";
    [key: string]: unknown;
  };
}

export interface SentimentUpdateEvent extends BaseEvent {
  type: "sentiment.update";
  data: {
    callId: string;
    sentiment: "positive" | "neutral" | "negative";
    confidence: number;
  };
}

export interface IntentDetectedEvent extends BaseEvent {
  type: "intent.detected";
  data: {
    callId: string;
    intent: string;
    confidence: number;
  };
}

/** alert.critical, alert.warning, etc. */
export interface AlertEvent extends BaseEvent {
  type: `alert.${string}`;
  data: {
    id: string;
    severity: 'critical' | 'warning';
    type: string;
    agentName: string;
    agentId?: string;
    sessionId?: string;
    timestamp: number;
    message?: string;
  };
}

export type RealtimeEvent = CallUpdateEvent | SentimentUpdateEvent | IntentDetectedEvent | AlertEvent;
