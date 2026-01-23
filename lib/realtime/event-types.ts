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

export type RealtimeEvent = CallUpdateEvent | SentimentUpdateEvent | IntentDetectedEvent;
