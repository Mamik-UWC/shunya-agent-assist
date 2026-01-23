'use client';

import * as React from 'react';
import { CheckCircle2, Circle, ArrowRight, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { SOPDocument } from '../types';

export interface SOPStep {
  id: string;
  title: string;
  description: string;
  order: number;
  required?: boolean;
  completed?: boolean;
}

export interface SOPStepViewerProps {
  document?: SOPDocument;
  steps?: SOPStep[];
  currentStepId?: string;
  onStepComplete?: (stepId: string) => void;
  className?: string;
}

export function SOPStepViewer({
  document,
  steps,
  currentStepId,
  onStepComplete,
  className,
}: SOPStepViewerProps) {
  // If steps are provided, use them; otherwise parse from document content
  const displaySteps = steps || [];

  if (displaySteps.length === 0 && !document) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText className="h-4 w-4" />
            SOP Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No SOP steps available.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Sort steps by order
  const sortedSteps = [...displaySteps].sort((a, b) => a.order - b.order);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <FileText className="h-4 w-4" />
          {document?.title || 'SOP Procedure'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {document && (
          <div className="mb-4 p-3 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground">{document.content}</p>
          </div>
        )}
        {sortedSteps.length > 0 && (
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {sortedSteps.map((step, index) => {
                const isCurrent = step.id === currentStepId;
                const isCompleted = step.completed || false;

                return (
                  <div key={step.id} className="flex gap-3">
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
                      {index < sortedSteps.length - 1 && (
                        <div
                          className={cn(
                            'w-0.5 h-6 mt-1',
                            isCompleted ? 'bg-green-600' : 'bg-muted'
                          )}
                        />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4
                          className={cn(
                            'text-sm font-medium',
                            isCurrent && 'text-primary',
                            isCompleted && 'text-muted-foreground'
                          )}
                        >
                          Step {step.order}: {step.title}
                        </h4>
                        {step.required && (
                          <Badge variant="outline" className="text-xs">
                            Required
                          </Badge>
                        )}
                        {isCurrent && (
                          <Badge variant="default" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                      {!isCompleted && onStepComplete && (
                        <button
                          onClick={() => onStepComplete(step.id)}
                          className="text-xs text-primary hover:underline"
                        >
                          Mark as complete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
