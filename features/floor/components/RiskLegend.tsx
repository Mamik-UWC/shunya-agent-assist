"use client";

export function RiskLegend() {
  return (
    <div className="flex flex-wrap items-center gap-6 border-t pt-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full bg-red-500"
          aria-hidden
        />
        <span>Critical</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full bg-amber-500"
          aria-hidden
        />
        <span>Warning</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full bg-green-500"
          aria-hidden
        />
        <span>Normal</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40"
          aria-hidden
        />
        <span>Idle</span>
      </div>
    </div>
  );
}
