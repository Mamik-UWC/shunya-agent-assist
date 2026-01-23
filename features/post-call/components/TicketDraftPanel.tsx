'use client';

import * as React from 'react';
import { Ticket, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface TicketDraftPanelProps {
  className?: string;
  initialData?: {
    title?: string;
    description?: string;
    priority?: string;
    category?: string;
  };
  onSave?: (data: {
    title: string;
    description: string;
    priority: string;
    category: string;
  }) => void;
}

export function TicketDraftPanel({
  className,
  initialData,
  onSave,
}: TicketDraftPanelProps) {
  const [title, setTitle] = React.useState(initialData?.title || '');
  const [description, setDescription] = React.useState(
    initialData?.description || ''
  );
  const [priority, setPriority] = React.useState(initialData?.priority || 'medium');
  const [category, setCategory] = React.useState(initialData?.category || '');

  const handleSave = () => {
    if (onSave && title.trim() && description.trim()) {
      onSave({
        title: title.trim(),
        description: description.trim(),
        priority,
        category,
      });
    }
  };

  const isFormValid = title.trim().length > 0 && description.trim().length > 0;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Ticket className="h-4 w-4" />
          Create Ticket
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ticket-title">Title</Label>
          <Input
            id="ticket-title"
            placeholder="Enter ticket title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ticket-description">Description</Label>
          <Textarea
            id="ticket-description"
            placeholder="Enter ticket description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ticket-priority">Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger id="ticket-priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ticket-category">Category</Label>
            <Input
              id="ticket-category"
              placeholder="Category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>
        <Button
          onClick={handleSave}
          className="w-full"
          disabled={!isFormValid}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
      </CardContent>
    </Card>
  );
}
