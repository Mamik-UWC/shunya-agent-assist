'use client';

import { useState } from 'react';
import { Download, ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { AuditLog } from '../types';

export interface AuditLogTableProps {
  logs?: AuditLog[];
  onExport?: () => void;
  className?: string;
}

export function AuditLogTable({
  logs = [],
  onExport,
  className,
}: AuditLogTableProps) {
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterResource, setFilterResource] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'timestamp' | 'action' | 'resource'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const uniqueActions = Array.from(new Set(logs.map((log) => log.action)));
  const uniqueResources = Array.from(new Set(logs.map((log) => log.resource)));

  const filteredLogs = logs
    .filter((log) => {
      if (filterAction !== 'all' && log.action !== filterAction) return false;
      if (filterResource !== 'all' && log.resource !== filterResource) return false;
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'timestamp':
          comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          break;
        case 'action':
          comparison = a.action.localeCompare(b.action);
          break;
        case 'resource':
          comparison = a.resource.localeCompare(b.resource);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleSort = (field: 'timestamp' | 'action' | 'resource') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const SortButton = ({ field, children }: { field: 'timestamp' | 'action' | 'resource'; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSort(field)}
      className="h-auto p-0 font-medium hover:bg-transparent"
    >
      {children}
      {sortBy === field ? (
        sortOrder === 'asc' ? (
          <ChevronUp className="size-4 ml-1" />
        ) : (
          <ChevronDown className="size-4 ml-1" />
        )
      ) : (
        <ArrowUpDown className="size-4 ml-1 opacity-50" />
      )}
    </Button>
  );

  if (logs.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No audit logs found.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Audit Logs ({filteredLogs.length})</CardTitle>
          {onExport && (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="size-4" />
              Export
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <label htmlFor="filterAction" className="text-sm font-medium">
                Action:
              </label>
              <select
                id="filterAction"
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="text-sm border border-border rounded-md px-2 py-1 bg-background"
              >
                <option value="all">All Actions</option>
                {uniqueActions.map((action) => (
                  <option key={action} value={action}>
                    {action}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="filterResource" className="text-sm font-medium">
                Resource:
              </label>
              <select
                id="filterResource"
                value={filterResource}
                onChange={(e) => setFilterResource(e.target.value)}
                className="text-sm border border-border rounded-md px-2 py-1 bg-background"
              >
                <option value="all">All Resources</option>
                {uniqueResources.map((resource) => (
                  <option key={resource} value={resource}>
                    {resource}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="border border-border/50 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      <SortButton field="timestamp">Timestamp</SortButton>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      <SortButton field="action">Action</SortButton>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      <SortButton field="resource">Resource</SortButton>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      User ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm">
                        {new Date(log.timestamp).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {log.resource}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {log.userId}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {log.metadata && Object.keys(log.metadata).length > 0 ? (
                          <details className="cursor-pointer">
                            <summary className="text-primary hover:underline">
                              View Metadata
                            </summary>
                            <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto max-w-md">
                              {JSON.stringify(log.metadata, null, 2)}
                            </pre>
                          </details>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
