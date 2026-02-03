"use client";

import { Tv } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export interface FloorHeaderProps {
  activeCount: number;
  autoRefresh: boolean;
  onAutoRefreshChange: (enabled: boolean) => void;
}

export function FloorHeader({
  activeCount,
  autoRefresh,
  onAutoRefreshChange,
}: FloorHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
      <div className="flex items-center gap-2">
        <Tv className="h-5 w-5 text-muted-foreground" aria-hidden />
        <h1 className="text-lg font-semibold">Live Floor View</h1>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-sm font-medium tabular-nums">
          Active: {activeCount}
        </span>
        <div className="flex items-center gap-2">
          <Switch
            id="floor-auto-refresh"
            checked={autoRefresh}
            onCheckedChange={onAutoRefreshChange}
            aria-label="Auto-refresh"
          />
          <Label
            htmlFor="floor-auto-refresh"
            className="cursor-pointer text-sm text-muted-foreground"
          >
            Auto-refresh
          </Label>
        </div>
      </div>
    </header>
  );
}
