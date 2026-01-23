'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { VersionHistoryPanel, type Version } from '@/components/layout/VersionHistoryPanel';
import { AuditTrailViewer, type AuditTrailEntry } from '@/components/layout/AuditTrailViewer';
import type { Intent } from '../types';

export interface IntentEditorProps {
  intents?: Intent[];
  versions?: Version[];
  auditEntries?: AuditTrailEntry[];
}

export function IntentEditor({
  intents = [],
  versions = [],
  auditEntries = [],
}: IntentEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIntent, setEditingIntent] = useState<Intent | null>(null);
  const [formData, setFormData] = useState<Partial<Intent>>({
    name: '',
    description: '',
    keywords: [],
    confidenceThreshold: 0.7,
    enabled: true,
  });

  const handleCreate = () => {
    setEditingIntent(null);
    setFormData({
      name: '',
      description: '',
      keywords: [],
      confidenceThreshold: 0.7,
      enabled: true,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (intent: Intent) => {
    setEditingIntent(intent);
    setFormData({
      name: intent.name,
      description: intent.description,
      keywords: intent.keywords,
      confidenceThreshold: intent.confidenceThreshold,
      enabled: intent.enabled,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this intent?')) {
      console.log('Delete intent:', id);
      // TODO: Implement delete functionality
    }
  };

  const handleSave = () => {
    console.log('Save intent:', editingIntent ? 'update' : 'create', formData);
    // TODO: Implement save functionality
    setIsDialogOpen(false);
    setEditingIntent(null);
  };

  const handleKeywordChange = (value: string) => {
    const keywords = value.split(',').map(k => k.trim()).filter(k => k.length > 0);
    setFormData({ ...formData, keywords });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Intents ({intents.length})</CardTitle>
                <CardDescription>
                  Configure call intents and their detection parameters
                </CardDescription>
              </div>
              <Button onClick={handleCreate} size="sm">
                <Plus className="size-4" />
                Add Intent
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {intents.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No intents configured. Create your first intent to get started.
              </p>
            ) : (
              <div className="space-y-3">
                {intents.map((intent) => (
                  <div
                    key={intent.id}
                    className="flex items-start justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{intent.name}</h4>
                        {intent.enabled ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                            Enabled
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            Disabled
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{intent.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">
                          Threshold: {(intent.confidenceThreshold * 100).toFixed(0)}%
                        </span>
                        {intent.keywords.length > 0 && (
                          <span className="text-xs text-muted-foreground">
                            Keywords: {intent.keywords.length}
                          </span>
                        )}
                      </div>
                      {intent.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {intent.keywords.slice(0, 5).map((keyword, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground"
                            >
                              {keyword}
                            </span>
                          ))}
                          {intent.keywords.length > 5 && (
                            <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                              +{intent.keywords.length - 5} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(intent)}
                      >
                        <Pencil className="size-4" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(intent.id)}
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
          resourceId="intents"
          resourceType="intent configuration"
          versions={versions}
          onRollback={(versionId) => {
            console.log('Rollback to version:', versionId);
            // TODO: Implement rollback
          }}
        />
        <AuditTrailViewer
          resourceId="intents"
          resourceType="intent configuration"
          entries={auditEntries}
          limit={5}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingIntent ? 'Edit Intent' : 'Create Intent'}</DialogTitle>
            <DialogDescription>
              Configure the intent name, description, keywords, and confidence threshold
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
                placeholder="e.g., Customer Support Request"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description *
              </label>
              <textarea
                id="description"
                required
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background min-h-[80px]"
                placeholder="Describe what this intent represents..."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="keywords" className="text-sm font-medium">
                Keywords (comma-separated)
              </label>
              <input
                id="keywords"
                type="text"
                value={formData.keywords?.join(', ') || ''}
                onChange={(e) => handleKeywordChange(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="e.g., help, support, issue, problem"
              />
              <p className="text-xs text-muted-foreground">
                Separate multiple keywords with commas
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="threshold" className="text-sm font-medium">
                Confidence Threshold: {(formData.confidenceThreshold || 0.7) * 100}%
              </label>
              <input
                id="threshold"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={formData.confidenceThreshold || 0.7}
                onChange={(e) => setFormData({ ...formData, confidenceThreshold: parseFloat(e.target.value) })}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Minimum confidence score required to match this intent
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="enabled"
                checked={formData.enabled ?? true}
                onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
              />
              <label htmlFor="enabled" className="text-sm font-medium cursor-pointer">
                Enable this intent
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
                {editingIntent ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
