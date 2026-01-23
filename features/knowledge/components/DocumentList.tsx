'use client';

import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { KnowledgeArticle } from '../types';

export interface DocumentListProps {
  documents?: KnowledgeArticle[];
  onView?: (documentId: string) => void;
  onEdit?: (documentId: string) => void;
  onDelete?: (documentId: string) => void;
  className?: string;
}

export function DocumentList({
  documents = [],
  onView,
  onEdit,
  onDelete,
  className,
}: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No documents found. Upload your first document to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Documents ({documents.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-start justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="space-y-1 flex-1">
                <h4 className="font-medium">{doc.title}</h4>
                {doc.category && (
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary mr-2">
                    {doc.category}
                  </span>
                )}
                {doc.tags && doc.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {doc.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {doc.content && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                    {doc.content.substring(0, 150)}...
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 ml-4">
                {onView && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(doc.id)}
                  >
                    <Eye className="size-4" />
                    View
                  </Button>
                )}
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(doc.id)}
                  >
                    <Pencil className="size-4" />
                    Edit
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(doc.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                    Delete
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
