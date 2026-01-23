export const FEATURE_FLAGS = {
  LIVE_SENTIMENT: "live_sentiment",
  UPSELL_PROMPTS: "upsell_prompts",
  AI_CHAT_ASSISTANT: "ai_chat_assistant",
  LIVE_MONITORING: "live_monitoring",
  ADVANCED_ANALYTICS: "advanced_analytics",
} as const;

export type FeatureFlag = (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS];
