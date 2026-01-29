"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ActiveCallCard } from "./ActiveCallCard";
import { IdleAgentCard } from "./IdleAgentCard";
import type { FloorSlot } from "@/features/floor/types";

export interface ActiveCallCardGridProps {
  slots: FloorSlot[];
  loading?: boolean;
  onCardClick?: (callIdOrAgentId: string) => void;
  className?: string;
}

export function ActiveCallCardGrid({
  slots,
  loading,
  onCardClick,
  className,
}: ActiveCallCardGridProps) {
  if (loading) {
    return (
      <div className={className}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="h-24 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className={className}>
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No agents to display</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) =>
          slot.status === "active" && slot.call ? (
            <ActiveCallCard
              key={slot.agentId}
              call={slot.call}
              onClick={onCardClick}
            />
          ) : (
            <IdleAgentCard
              key={slot.agentId}
              agentId={slot.agentId}
              agentName={slot.agentName}
              onClick={onCardClick}
            />
          )
        )}
      </div>
    </div>
  );
}
