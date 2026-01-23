'use client';

import * as React from 'react';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLiveCallStore } from '@/stores/live-call.store';
import { cn } from '@/lib/utils';

export interface ComplianceStatusProps {
  className?: string;
}

type ComplianceStatus = 'compliant' | 'non-compliant' | 'pending';

export function ComplianceStatus({ className }: ComplianceStatusProps) {
  const callData = useLiveCallStore((state) => state.callData);
  const status = (callData?.complianceStatus as ComplianceStatus) || 'pending';

  const getStatusConfig = (status: ComplianceStatus) => {
    switch (status) {
      case 'compliant':
        return {
          icon: CheckCircle2,
          color: 'text-green-600',
          bgColor: 'bg-green-50 dark:bg-green-950',
          borderColor: 'border-green-200 dark:border-green-800',
          badgeVariant: 'default' as const,
          label: 'Compliant',
        };
      case 'non-compliant':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50 dark:bg-red-950',
          borderColor: 'border-red-200 dark:border-red-800',
          badgeVariant: 'destructive' as const,
          label: 'Non-Compliant',
        };
      case 'pending':
      default:
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50 dark:bg-yellow-950',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          badgeVariant: 'secondary' as const,
          label: 'Pending Review',
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;
  const issues = (callData?.complianceIssues as string[]) || [];

  return (
    <Card className={cn('border-2', config.borderColor, className)}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Icon className={cn('h-4 w-4', config.color)} />
          Compliance Status
        </CardTitle>
      </CardHeader>
      <CardContent className={cn('rounded-md p-3', config.bgColor)}>
        <div className="space-y-2">
          <Badge variant={config.badgeVariant}>{config.label}</Badge>
          {issues.length > 0 && (
            <div className="mt-2 space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Issues:</p>
              <ul className="list-disc list-inside space-y-0.5 text-xs text-muted-foreground">
                {issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
