'use client';

import * as React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLiveCallStore } from '@/stores/live-call.store';
import { cn } from '@/lib/utils';

export interface SOPFlowPanelProps {
  className?: string;
}

interface SOPStep {
  id: string;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'pending';
}

export function SOPFlowPanel({ className }: SOPFlowPanelProps) {
  const callData = useLiveCallStore((state) => state.callData);
  const steps = (callData?.sopSteps as SOPStep[]) || [];
  const currentStepId = callData?.currentStepId as string | undefined;

  // If no steps provided, show default empty state
  if (steps.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-sm">SOP Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No SOP steps available for this call.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm">Current SOP Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current' || step.id === currentStepId;
            const isPending = step.status === 'pending' && !isCurrent;

            return (
              <div key={step.id} className="flex items-start gap-3">
                <div className="flex flex-col items-center pt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : isCurrent ? (
                    <div className="relative">
                      <Circle className="h-5 w-5 text-primary fill-primary" />
                      <div className="absolute inset-0 animate-ping">
                        <Circle className="h-5 w-5 text-primary opacity-75" />
                      </div>
                    </div>
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'w-0.5 h-6 mt-1',
                        isCompleted ? 'bg-green-600' : 'bg-muted'
                      )}
                    />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4
                      className={cn(
                        'text-sm font-medium',
                        isCurrent && 'text-primary',
                        isPending && 'text-muted-foreground'
                      )}
                    >
                      {step.title}
                    </h4>
                    {isCurrent && (
                      <Badge variant="default" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  {step.description && (
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
