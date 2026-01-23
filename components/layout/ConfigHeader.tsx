'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

export interface ConfigHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function ConfigHeader({
  title,
  description,
  actions,
}: ConfigHeaderProps) {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-muted-foreground text-base">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2">{actions}</div>
        )}
      </div>
    </div>
  );
}
