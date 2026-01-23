'use client';

import * as React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface SafetyNoticeProps {
  className?: string;
  variant?: 'default' | 'warning' | 'info';
}

export function SafetyNotice({
  className,
  variant = 'default',
}: SafetyNoticeProps) {
  const config = {
    default: {
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      borderColor: 'border-blue-200 dark:border-blue-800',
      title: 'Safety & Compliance',
    },
    warning: {
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      title: 'Important Notice',
    },
    info: {
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      borderColor: 'border-blue-200 dark:border-blue-800',
      title: 'Information',
    },
  };

  const currentConfig = config[variant];
  const Icon = currentConfig.icon;

  return (
    <Card className={cn('border-2', currentConfig.borderColor, className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Icon className={cn('h-4 w-4', currentConfig.color)} />
          {currentConfig.title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn('rounded-md p-3', currentConfig.bgColor)}>
        <div className="space-y-2 text-sm">
          <p className="font-medium">AI Assistant Guidelines</p>
          <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
            <li>This AI assistant is designed to support your work, not replace your judgment.</li>
            <li>Always verify critical information before sharing with customers.</li>
            <li>Do not share sensitive customer data or personal information.</li>
            <li>Follow your organization's compliance and data protection policies.</li>
            <li>Report any inappropriate responses or errors immediately.</li>
          </ul>
          <div className="pt-2 border-t border-current/20">
            <Badge variant="outline" className="text-xs">
              All conversations are logged for quality and compliance purposes.
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
