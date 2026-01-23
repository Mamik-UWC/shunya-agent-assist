'use client';

import * as React from 'react';
import { LiveCallCard } from './LiveCallCard';
import { Card, CardContent } from '@/components/ui/card';
import type { LiveCall } from '@/types/manager';

export interface LiveCallGridProps {
  calls?: LiveCall[];
  loading?: boolean;
  className?: string;
}

export function LiveCallGrid({ calls = [], loading, className }: LiveCallGridProps) {
  if (loading) {
    return (
      <div className={className}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-48 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (calls.length === 0) {
    return (
      <div className={className}>
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No active calls at the moment</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {calls.map((call) => (
          <LiveCallCard key={call.id} call={call} />
        ))}
      </div>
    </div>
  );
}
