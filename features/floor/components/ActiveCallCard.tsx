"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { FloorCall, SentimentTrend } from "@/features/floor/types";

const RISK_DOT_CLASSES = {
  critical: "bg-red-500",
  warning: "bg-amber-500",
  normal: "bg-green-500",
} as const;

const RISK_BORDER_CLASSES = {
  critical: "border-red-500 border-2",
  warning: "border-amber-500 border-2",
  normal: "border-green-500/60 border",
} as const;

const TREND_SYMBOL: Record<SentimentTrend, string> = {
  up: "↑",
  down: "↓",
  stable: "→",
};

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

function formatSentiment(score: number, trend: SentimentTrend): string {
  const sign = score >= 0 ? "+" : "";
  const trendSym = trend === "stable" ? "" : ` ${TREND_SYMBOL[trend]}`;
  return `Sent: ${sign}${score}${trendSym}`;
}

export interface ActiveCallCardProps {
  call: FloorCall;
  onClick?: (callId: string) => void;
  className?: string;
}

export function ActiveCallCard({ call, onClick, className }: ActiveCallCardProps) {
  const [duration, setDuration] = React.useState(call.duration);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const startTime = new Date(call.startTime).getTime();
      const now = Date.now();
      setDuration(Math.floor((now - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [call.startTime]);

  const borderClass = RISK_BORDER_CLASSES[call.riskLevel];
  const dotClass = RISK_DOT_CLASSES[call.riskLevel];

  return (
    <Card
      className={cn(
        "transition-colors",
        borderClass,
        onClick ? "cursor-pointer hover:bg-muted/50" : "",
        className
      )}
      onClick={onClick ? () => onClick(call.id) : undefined}
      role={onClick ? "button" : undefined}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-2">
          <span
            className={cn("mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full", dotClass)}
            aria-label={`Risk: ${call.riskLevel}`}
          />
          <div className="min-w-0 flex-1 space-y-1 text-sm">
            <div className="font-medium">{call.agentName}</div>
            <div className="text-muted-foreground">
              {formatDuration(duration)} | {call.queue}
            </div>
            <div>
              Intent: {call.intent}
            </div>
            <div className="text-muted-foreground">
              {formatSentiment(call.sentimentScore, call.sentimentTrend)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
