'use client';

import * as React from 'react';
import { Search, FileText, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SOPDocument } from '../types';

export interface KnowledgeSearchProps {
  documents?: SOPDocument[];
  onSearch?: (query: string) => void;
  onDocumentSelect?: (documentId: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function KnowledgeSearch({
  documents = [],
  onSearch,
  onDocumentSelect,
  isLoading = false,
  className,
}: KnowledgeSearchProps) {
  const [query, setQuery] = React.useState('');
  const [debouncedQuery, setDebouncedQuery] = React.useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  React.useEffect(() => {
    if (debouncedQuery.trim() && onSearch) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const filteredDocuments = React.useMemo(() => {
    if (!debouncedQuery.trim()) return documents;
    const lowerQuery = debouncedQuery.toLowerCase();
    return documents.filter(
      (doc) =>
        doc.title.toLowerCase().includes(lowerQuery) ||
        doc.content.toLowerCase().includes(lowerQuery) ||
        doc.category?.toLowerCase().includes(lowerQuery) ||
        doc.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }, [documents, debouncedQuery]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Search className="h-4 w-4" />
          Search Knowledge Base
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents, categories, tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
        {query && (
          <div className="text-xs text-muted-foreground">
            {filteredDocuments.length} {filteredDocuments.length === 1 ? 'result' : 'results'} found
          </div>
        )}
        <ScrollArea className="h-[300px]">
          <div className="space-y-2">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  {query ? 'No documents found' : 'Start typing to search'}
                </p>
              </div>
            ) : (
              filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => onDocumentSelect?.(doc.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-1">
                      <h4 className="text-sm font-medium">{doc.title}</h4>
                      {doc.category && (
                        <Badge variant="secondary" className="text-xs mr-2">
                          {doc.category}
                        </Badge>
                      )}
                      {doc.tags && doc.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {doc.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {doc.content && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {doc.content.substring(0, 150)}...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
