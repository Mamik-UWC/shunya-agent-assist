'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Settings, X, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { VersionHistoryPanel, type Version } from '@/components/layout/VersionHistoryPanel';
import { AuditTrailViewer, type AuditTrailEntry } from '@/components/layout/AuditTrailViewer';
import type { RetentionPolicy } from '../types';

export interface RetentionPolicyEditorProps {
  policies?: RetentionPolicy[];
  versions?: Version[];
  auditEntries?: AuditTrailEntry[];
}

const DATA_TYPES: Array<{ value: RetentionPolicy['dataType']; label: string; description: string }> = [
  {
    value: 'calls',
    label: 'Call Recordings',
    description: 'Audio recordings of customer calls',
  },
  {
    value: 'transcripts',
    label: 'Call Transcripts',
    description: 'Text transcripts of customer calls',
  },
  {
    value: 'logs',
    label: 'System Logs',
    description: 'Application and system logs',
  },
  {
    value: 'analytics',
    label: 'Analytics Data',
    description: 'Analytics and reporting data',
  },
  {
    value: 'other',
    label: 'Other Data',
    description: 'Other types of data',
  },
];

export function RetentionPolicyEditor({
  policies = [],
  versions = [],
  auditEntries = [],
}: RetentionPolicyEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<RetentionPolicy | null>(null);
  const [formData, setFormData] = useState<Partial<RetentionPolicy>>({
    dataType: 'calls',
    retentionPeriodDays: 90,
    action: 'delete',
    enabled: true,
  });

  const handleCreate = () => {
    setEditingPolicy(null);
    setFormData({
      dataType: 'calls',
      retentionPeriodDays: 90,
      action: 'delete',
      enabled: true,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (policy: RetentionPolicy) => {
    setEditingPolicy(policy);
    setFormData({
      dataType: policy.dataType,
      retentionPeriodDays: policy.retentionPeriodDays,
      action: policy.action,
      enabled: policy.enabled,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this retention policy?')) {
      console.log('Delete policy:', id);
      // TODO: Implement delete functionality
    }
  };

  const handleSave = () => {
    console.log('Save policy:', editingPolicy ? 'update' : 'create', formData);
    // TODO: Implement save functionality
    setIsDialogOpen(false);
    setEditingPolicy(null);
  };

  const getPolicyForDataType = (dataType: RetentionPolicy['dataType']) => {
    return policies.find(p => p.dataType === dataType);
  };

  const formatPeriod = (days: number) => {
    if (days < 30) return `${days} days`;
    if (days < 365) return `${Math.floor(days / 30)} months`;
    return `${Math.floor(days / 365)} years`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Retention Policies ({policies.length})</CardTitle>
                <CardDescription>
                  Configure data retention policies for different data types
                </CardDescription>
              </div>
              <Button onClick={handleCreate} size="sm">
                <Plus className="size-4" />
                Add Policy
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {DATA_TYPES.map((dataType) => {
                const policy = getPolicyForDataType(dataType.value);
                return (
                  <div
                    key={dataType.value}
                    className="p-4 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{dataType.label}</h4>
                          {policy?.enabled ? (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                              Active
                            </span>
                          ) : policy ? (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                              Inactive
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                              Not Configured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{dataType.description}</p>
                        {policy ? (
                          <div className="mt-2 space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">Retention:</span>{' '}
                              {formatPeriod(policy.retentionPeriodDays)}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Action:</span>{' '}
                              <span className="capitalize">{policy.action}</span>
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground mt-2">
                            No retention policy configured
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {policy ? (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(policy)}
                            >
                              <Pencil className="size-4" />
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(policy.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="size-4" />
                              Delete
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setFormData({ ...formData, dataType: dataType.value });
                              setEditingPolicy(null);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Settings className="size-4" />
                            Configure
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <VersionHistoryPanel
          resourceId="retention-policies"
          resourceType="retention policies"
          versions={versions}
          onRollback={(versionId) => {
            console.log('Rollback to version:', versionId);
            // TODO: Implement rollback
          }}
        />
        <AuditTrailViewer
          resourceId="retention-policies"
          resourceType="retention policies"
          entries={auditEntries}
          limit={5}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingPolicy ? 'Edit Retention Policy' : 'Create Retention Policy'}
            </DialogTitle>
            <DialogDescription>
              Configure how long to retain data and what action to take when the period expires
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="dataType" className="text-sm font-medium">
                Data Type *
              </label>
              <select
                id="dataType"
                required
                value={formData.dataType || 'calls'}
                onChange={(e) => setFormData({ ...formData, dataType: e.target.value as RetentionPolicy['dataType'] })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                disabled={!!editingPolicy}
              >
                {DATA_TYPES.map((dt) => (
                  <option key={dt.value} value={dt.value}>
                    {dt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="period" className="text-sm font-medium">
                Retention Period: {formatPeriod(formData.retentionPeriodDays || 90)}
              </label>
              <div className="space-y-2">
                <input
                  id="period"
                  type="range"
                  min="1"
                  max="3650"
                  step="1"
                  value={formData.retentionPeriodDays || 90}
                  onChange={(e) => setFormData({ ...formData, retentionPeriodDays: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 day</span>
                  <span>1 year</span>
                  <span>10 years</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Data will be retained for {formatPeriod(formData.retentionPeriodDays || 90)} before the action is taken
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="action" className="text-sm font-medium">
                Action *
              </label>
              <select
                id="action"
                required
                value={formData.action || 'delete'}
                onChange={(e) => setFormData({ ...formData, action: e.target.value as 'delete' | 'archive' })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="delete">Delete Permanently</option>
                <option value="archive">Archive (Move to Cold Storage)</option>
              </select>
              <p className="text-xs text-muted-foreground">
                {formData.action === 'delete'
                  ? 'Data will be permanently deleted and cannot be recovered'
                  : 'Data will be moved to archive storage and can be restored if needed'}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="enabled"
                checked={formData.enabled ?? true}
                onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
              />
              <label htmlFor="enabled" className="text-sm font-medium cursor-pointer">
                Enable this policy
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                <X className="size-4" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="size-4" />
                {editingPolicy ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
