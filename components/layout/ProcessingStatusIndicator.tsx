'use client';

import { cn } from '@/lib/utils/cn';

export type ProcessingStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface ProcessingStatusIndicatorProps {
  status: ProcessingStatus;
  message?: string;
  progress?: number;
  className?: string;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-500/10 text-yellow-500',
    icon: '⏳',
  },
  processing: {
    label: 'Processing',
    color: 'bg-blue-500/10 text-blue-500',
    icon: '⚙️',
  },
  completed: {
    label: 'Completed',
    color: 'bg-green-500/10 text-green-500',
    icon: '✓',
  },
  failed: {
    label: 'Failed',
    color: 'bg-red-500/10 text-red-500',
    icon: '✗',
  },
};

export function ProcessingStatusIndicator({
  status,
  message,
  progress,
  className,
}: ProcessingStatusIndicatorProps) {
  const config = statusConfig[status];

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium',
            config.color
          )}
        >
          <span>{config.icon}</span>
          <span>{config.label}</span>
        </div>
        {message && (
          <p className="text-sm text-muted-foreground">{message}</p>
        )}
      </div>
      
      {status === 'processing' && progress !== undefined && (
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}
