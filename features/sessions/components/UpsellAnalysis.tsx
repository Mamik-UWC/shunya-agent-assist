'use client';

import * as React from 'react';
import { DollarSign, Target, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { SessionDetail } from '@/types/manager';

export interface UpsellAnalysisProps {
  session?: SessionDetail;
  className?: string;
}

export function UpsellAnalysis({ session, className }: UpsellAnalysisProps) {
  if (!session || !session.upsellAnalysis) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Upsell Analysis</CardTitle>
          <CardDescription>Upsell opportunity analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  const analysis = session.upsellAnalysis;
  const conversionRate =
    analysis.opportunities > 0
      ? (analysis.successful / analysis.opportunities) * 100
      : 0;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'successful':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'declined':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'attempted':
        return <Target className="h-4 w-4 text-amber-600" />;
      default:
        return <Target className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'successful':
        return <Badge variant="default">Successful</Badge>;
      case 'declined':
        return <Badge variant="destructive">Declined</Badge>;
      case 'attempted':
        return <Badge variant="secondary">Attempted</Badge>;
      default:
        return <Badge variant="outline">Opportunity</Badge>;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Upsell Analysis
        </CardTitle>
        <CardDescription>Upsell opportunity analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Opportunities</div>
            <div className="text-2xl font-bold">{analysis.opportunities}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Attempted</div>
            <div className="text-2xl font-bold">{analysis.attempted}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Successful</div>
            <div className="text-2xl font-bold text-green-600">{analysis.successful}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Conversion Rate</div>
            <div className="text-2xl font-bold">{conversionRate.toFixed(1)}%</div>
          </div>
        </div>
        {analysis.revenue !== undefined && analysis.revenue > 0 && (
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <DollarSign className="h-5 w-5 text-green-600" />
            <div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
              <div className="text-xl font-bold">
                {analysis.revenue.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </div>
            </div>
          </div>
        )}
        {analysis.details.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Upsell Details</h4>
            <div className="space-y-2">
              {analysis.details.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {getStatusIcon(detail.status)}
                    <div className="flex-1">
                      <div className="font-medium text-sm">{detail.product}</div>
                      <div className="text-xs text-muted-foreground">
                        {Math.floor(detail.timestamp / 60)}m {detail.timestamp % 60}s
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(detail.status)}
                    {detail.value && (
                      <div className="text-sm font-medium">
                        {detail.value.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
