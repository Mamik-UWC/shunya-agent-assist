"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface IdleAgentCardProps {
  agentId: string;
  agentName: string;
  onClick?: (agentId: string) => void;
  className?: string;
}

export function IdleAgentCard({
  agentId,
  agentName,
  onClick,
  className,
}: IdleAgentCardProps) {
  return (
    <Card
      className={cn(
        "border-muted transition-colors",
        onClick ? "cursor-pointer hover:bg-muted/50" : "",
        className
      )}
      onClick={onClick ? () => onClick(agentId) : undefined}
      role={onClick ? "button" : undefined}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-2">
          <span
            className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-muted-foreground/40"
            aria-label="Idle"
          />
          <div className="min-w-0 flex-1 space-y-1 text-sm">
            <div className="font-medium">{agentName}</div>
            <div className="text-muted-foreground">- | -</div>
            <div>Intent: -</div>
            <div className="text-muted-foreground">Sent: -</div>
            <div className="text-muted-foreground text-xs">Idle</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
