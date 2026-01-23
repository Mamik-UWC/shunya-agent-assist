'use client';

import { useState } from 'react';
import { Undo2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

export interface Version {
  id: string;
  version: string;
  createdAt: string;
  createdBy: string;
  changes: string[];
  isCurrent?: boolean;
}

export interface VersionHistoryPanelProps {
  resourceId: string;
  resourceType: string;
  versions?: Version[];
  onRollback?: (versionId: string) => void;
  className?: string;
}

export function VersionHistoryPanel({
  resourceId,
  resourceType,
  versions = [],
  onRollback,
  className,
}: VersionHistoryPanelProps) {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  if (versions.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Version History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No version history available for this {resourceType}.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Version History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {versions.map((version) => (
            <div
              key={version.id}
              className={cn(
                'border border-border rounded-lg p-4 transition-colors',
                selectedVersion === version.id
                  ? 'border-primary/50 bg-primary/5'
                  : 'hover:border-primary/30'
              )}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Version {version.version}</span>
                    {version.isCurrent && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Created by {version.createdBy} on{' '}
                    {new Date(version.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  {version.changes.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {version.changes.map((change, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {!version.isCurrent && onRollback && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRollback(version.id)}
                    className="ml-4"
                  >
                    <Undo2 className="size-4" />
                    Rollback
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
