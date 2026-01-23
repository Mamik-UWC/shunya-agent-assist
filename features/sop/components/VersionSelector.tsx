'use client';

import * as React from 'react';
import { History, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface DocumentVersion {
  id: string;
  version: string;
  createdAt: string;
  createdBy?: string;
  isCurrent?: boolean;
  changeLog?: string;
}

export interface VersionSelectorProps {
  versions?: DocumentVersion[];
  selectedVersionId?: string;
  onVersionChange?: (versionId: string) => void;
  className?: string;
}

export function VersionSelector({
  versions = [],
  selectedVersionId,
  onVersionChange,
  className,
}: VersionSelectorProps) {
  if (versions.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <History className="h-4 w-4" />
            Version History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No version history available.
          </p>
        </CardContent>
      </Card>
    );
  }

  const sortedVersions = [...versions].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const currentVersion = sortedVersions.find((v) => v.isCurrent);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <History className="h-4 w-4" />
          Document Version
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select
          value={selectedVersionId || currentVersion?.id || sortedVersions[0]?.id}
          onValueChange={(value) => onVersionChange?.(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select version" />
          </SelectTrigger>
          <SelectContent>
            {sortedVersions.map((version) => (
              <SelectItem key={version.id} value={version.id}>
                <div className="flex items-center gap-2">
                  <span>v{version.version}</span>
                  {version.isCurrent && (
                    <Badge variant="default" className="text-xs">
                      Current
                    </Badge>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="space-y-2 text-sm">
          {sortedVersions.map((version) => {
            if (version.id !== (selectedVersionId || currentVersion?.id || sortedVersions[0]?.id)) {
              return null;
            }
            return (
              <div key={version.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Created: {new Date(version.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {version.createdBy && (
                  <p className="text-xs text-muted-foreground">
                    By: {version.createdBy}
                  </p>
                )}
                {version.changeLog && (
                  <div className="mt-2 p-2 bg-muted rounded-md">
                    <p className="text-xs font-medium mb-1">Changes:</p>
                    <p className="text-xs text-muted-foreground">{version.changeLog}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
