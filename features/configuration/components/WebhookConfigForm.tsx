'use client';

import { useState } from 'react';
import { Plus, TestTube, Pencil, Trash2, X, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { VersionHistoryPanel, type Version } from '@/components/layout/VersionHistoryPanel';
import { AuditTrailViewer, type AuditTrailEntry } from '@/components/layout/AuditTrailViewer';
import type { WebhookConfig } from '../types';

export interface WebhookConfigFormProps {
  webhooks?: WebhookConfig[];
  versions?: Version[];
  auditEntries?: AuditTrailEntry[];
}

const AVAILABLE_EVENTS = [
  'call.started',
  'call.ended',
  'call.transcribed',
  'intent.detected',
  'sentiment.changed',
  'compliance.alert',
  'session.completed',
];

export function WebhookConfigForm({
  webhooks = [],
  versions = [],
  auditEntries = [],
}: WebhookConfigFormProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState<WebhookConfig | null>(null);
  const [formData, setFormData] = useState<Partial<WebhookConfig>>({
    name: '',
    url: '',
    events: [],
    headers: {},
    active: true,
  });
  const [headerKey, setHeaderKey] = useState('');
  const [headerValue, setHeaderValue] = useState('');

  const handleCreate = () => {
    setEditingWebhook(null);
    setFormData({
      name: '',
      url: '',
      events: [],
      headers: {},
      active: true,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (webhook: WebhookConfig) => {
    setEditingWebhook(webhook);
    setFormData({
      name: webhook.name,
      url: webhook.url,
      events: webhook.events,
      headers: webhook.headers || {},
      active: webhook.active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this webhook?')) {
      console.log('Delete webhook:', id);
      // TODO: Implement delete functionality
    }
  };

  const handleTest = (id: string) => {
    console.log('Test webhook:', id);
    // TODO: Implement test functionality
    alert('Webhook test triggered. Check your endpoint for the test payload.');
  };

  const handleSave = () => {
    console.log('Save webhook:', editingWebhook ? 'update' : 'create', formData);
    // TODO: Implement save functionality
    setIsDialogOpen(false);
    setEditingWebhook(null);
  };

  const handleEventToggle = (event: string) => {
    const events = formData.events || [];
    if (events.includes(event)) {
      setFormData({ ...formData, events: events.filter(e => e !== event) });
    } else {
      setFormData({ ...formData, events: [...events, event] });
    }
  };

  const handleAddHeader = () => {
    if (headerKey && headerValue) {
      const headers = formData.headers || {};
      setFormData({
        ...formData,
        headers: { ...headers, [headerKey]: headerValue },
      });
      setHeaderKey('');
      setHeaderValue('');
    }
  };

  const handleRemoveHeader = (key: string) => {
    const headers = formData.headers || {};
    const newHeaders = { ...headers };
    delete newHeaders[key];
    setFormData({ ...formData, headers: newHeaders });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Webhooks ({webhooks.length})</CardTitle>
                <CardDescription>
                  Configure webhooks to receive real-time events
                </CardDescription>
              </div>
              <Button onClick={handleCreate} size="sm">
                <Plus className="size-4" />
                Add Webhook
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {webhooks.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No webhooks configured. Create your first webhook to receive events.
              </p>
            ) : (
              <div className="space-y-3">
                {webhooks.map((webhook) => (
                  <div
                    key={webhook.id}
                    className="flex items-start justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{webhook.name}</h4>
                        {webhook.active ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                            Active
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            Inactive
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground font-mono break-all">
                        {webhook.url}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {webhook.events.slice(0, 3).map((event, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground"
                          >
                            {event}
                          </span>
                        ))}
                        {webhook.events.length > 3 && (
                          <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                            +{webhook.events.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTest(webhook.id)}
                      >
                        <TestTube className="size-4" />
                        Test
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(webhook)}
                      >
                        <Pencil className="size-4" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(webhook.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <VersionHistoryPanel
          resourceId="webhooks"
          resourceType="webhook configuration"
          versions={versions}
          onRollback={(versionId) => {
            console.log('Rollback to version:', versionId);
            // TODO: Implement rollback
          }}
        />
        <AuditTrailViewer
          resourceId="webhooks"
          resourceType="webhook configuration"
          entries={auditEntries}
          limit={5}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingWebhook ? 'Edit Webhook' : 'Create Webhook'}</DialogTitle>
            <DialogDescription>
              Configure webhook URL, events, and headers
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="e.g., Production Webhook"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium">
                URL *
              </label>
              <input
                id="url"
                type="url"
                required
                value={formData.url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background font-mono"
                placeholder="https://example.com/webhook"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Events *</label>
              <div className="space-y-2 max-h-48 overflow-y-auto border border-border rounded-md p-3">
                {AVAILABLE_EVENTS.map((event) => (
                  <label key={event} className="flex items-center space-x-2 cursor-pointer">
                    <Switch
                      checked={(formData.events || []).includes(event)}
                      onCheckedChange={() => handleEventToggle(event)}
                    />
                    <span className="text-sm font-mono">{event}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Headers</label>
              <div className="space-y-2">
                {Object.entries(formData.headers || {}).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-sm font-mono flex-1 px-2 py-1 bg-muted rounded">
                      {key}: {value as string}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveHeader(key)}
                    >
                      <X className="size-4" />
                      Remove
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={headerKey}
                    onChange={(e) => setHeaderKey(e.target.value)}
                    placeholder="Header name"
                    className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-sm"
                  />
                  <input
                    type="text"
                    value={headerValue}
                    onChange={(e) => setHeaderValue(e.target.value)}
                    placeholder="Header value"
                    className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-sm"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddHeader}
                    disabled={!headerKey || !headerValue}
                  >
                    <Plus className="size-4" />
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.active ?? true}
                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              />
              <label htmlFor="active" className="text-sm font-medium cursor-pointer">
                Active
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
                {editingWebhook ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
