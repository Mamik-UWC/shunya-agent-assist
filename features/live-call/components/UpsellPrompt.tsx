'use client';

import * as React from 'react';
import { TrendingUp, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLiveCallStore } from '@/stores/live-call.store';
import { useFeature } from '@/hooks/useFeature';
import { cn } from '@/lib/utils';

export interface UpsellPromptProps {
  className?: string;
  onDismiss?: () => void;
  onApply?: (productId: string) => void;
}

interface UpsellOpportunity {
  id: string;
  productName: string;
  description: string;
  confidence: number;
  estimatedValue?: number;
  reason: string;
}

export function UpsellPrompt({
  className,
  onDismiss,
  onApply,
}: UpsellPromptProps) {
  const callData = useLiveCallStore((state) => state.callData);
  const hasUpsell = useFeature('upsell_prompts');

  if (!hasUpsell) {
    return null;
  }

  const opportunity = callData?.upsellOpportunity as UpsellOpportunity | undefined;

  if (!opportunity) {
    return null;
  }

  // Only show if confidence is high enough
  if (opportunity.confidence < 0.7) {
    return null;
  }

  return (
    <Card className={cn('border-primary/50 bg-primary/5', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Upsell Opportunity
          </CardTitle>
          {onDismiss && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onDismiss}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div>
            <h4 className="font-medium text-sm mb-1">{opportunity.productName}</h4>
            <p className="text-xs text-muted-foreground">
              {opportunity.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs">
              {Math.round(opportunity.confidence * 100)}% match
            </Badge>
            {opportunity.estimatedValue && (
              <Badge variant="secondary" className="text-xs">
                ${opportunity.estimatedValue}
              </Badge>
            )}
          </div>
          <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">
            <strong>Why:</strong> {opportunity.reason}
          </div>
        </div>
        {onApply && (
          <Button
            size="sm"
            className="w-full"
            onClick={() => onApply(opportunity.id)}
          >
            Present Offer
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
