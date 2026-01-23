'use client';

import * as React from 'react';
import { Smile, Frown, Meh } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLiveCallStore } from '@/stores/live-call.store';
import { useFeature } from '@/hooks/useFeature';
import { cn } from '@/lib/utils';

export interface SentimentIndicatorProps {
  className?: string;
}

type Sentiment = 'positive' | 'neutral' | 'negative';

interface SentimentDisplayProps {
  label: string;
  sentiment?: Sentiment;
  value?: number;
}

function SentimentDisplay({ label, sentiment, value }: SentimentDisplayProps) {
  const getSentimentIcon = (sent?: Sentiment) => {
    switch (sent) {
      case 'positive':
        return <Smile className="h-4 w-4 text-green-600" />;
      case 'negative':
        return <Frown className="h-4 w-4 text-red-600" />;
      case 'neutral':
      default:
        return <Meh className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getSentimentVariant = (sent?: Sentiment): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (sent) {
      case 'positive':
        return 'default';
      case 'negative':
        return 'destructive';
      case 'neutral':
      default:
        return 'secondary';
    }
  };

  return (
    <div className="flex items-center gap-2">
      {getSentimentIcon(sentiment)}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">{label}</span>
          {value !== undefined && (
            <span className="text-xs font-medium">{Math.round(value * 100)}%</span>
          )}
        </div>
        <Badge variant={getSentimentVariant(sentiment)} className="text-xs">
          {sentiment || 'Unknown'}
        </Badge>
      </div>
    </div>
  );
}

export function SentimentIndicator({ className }: SentimentIndicatorProps) {
  const callData = useLiveCallStore((state) => state.callData);
  const hasSentiment = useFeature('live_sentiment');

  if (!hasSentiment) {
    return null;
  }

  const customerSentiment = callData?.sentiment as Sentiment | undefined;
  const agentSentiment = callData?.agentSentiment as Sentiment | undefined;
  const customerSentimentValue = callData?.customerSentimentValue as number | undefined;
  const agentSentimentValue = callData?.agentSentimentValue as number | undefined;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm">Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SentimentDisplay
          label="Customer"
          sentiment={customerSentiment}
          value={customerSentimentValue}
        />
        <SentimentDisplay
          label="Agent"
          sentiment={agentSentiment}
          value={agentSentimentValue}
        />
      </CardContent>
    </Card>
  );
}
