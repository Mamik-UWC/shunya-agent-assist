'use client';

import * as React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLiveCallStore } from '@/stores/live-call.store';
import { cn } from '@/lib/utils';

export interface NextBestActionCardProps {
  className?: string;
  onActionSelect?: (actionId: string) => void;
}

interface SuggestedAction {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category?: string;
}

export function NextBestActionCard({
  className,
  onActionSelect,
}: NextBestActionCardProps) {
  const callData = useLiveCallStore((state) => state.callData);
  const actions = (callData?.suggestedActions as SuggestedAction[]) || [];

  const getPriorityVariant = (
    priority: string
  ): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
      default:
        return 'secondary';
    }
  };

  if (actions.length === 0) {
    return (
      <Card className={cn('border-dashed', className)}>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Next Best Action
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No actions suggested at this time.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Show the highest priority action first
  const sortedActions = [...actions].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const primaryAction = sortedActions[0];

  return (
    <Card className={cn('border-primary/20', className)}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Recommended Action
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm">{primaryAction.title}</h4>
                <Badge
                  variant={getPriorityVariant(primaryAction.priority)}
                  className="text-xs"
                >
                  {primaryAction.priority}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {primaryAction.description}
              </p>
            </div>
          </div>
          {onActionSelect && (
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => onActionSelect(primaryAction.id)}
            >
              Apply Action
              <ArrowRight className="h-3 w-3 ml-2" />
            </Button>
          )}
        </div>
        {sortedActions.length > 1 && (
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">
              Other suggestions ({sortedActions.length - 1})
            </p>
            <div className="space-y-1">
              {sortedActions.slice(1, 4).map((action) => (
                <button
                  key={action.id}
                  onClick={() => onActionSelect?.(action.id)}
                  className="w-full text-left text-xs p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-1">{action.title}</span>
                    <Badge
                      variant={getPriorityVariant(action.priority)}
                      className="text-xs"
                    >
                      {action.priority}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
