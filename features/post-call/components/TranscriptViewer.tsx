'use client';

import * as React from 'react';
import { Search, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface TranscriptViewerProps {
  transcript?: string;
  className?: string;
  searchable?: boolean;
}

export function TranscriptViewer({
  transcript,
  className,
  searchable = true,
}: TranscriptViewerProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [highlightedText, setHighlightedText] = React.useState<string>('');

  React.useEffect(() => {
    if (!transcript || !searchQuery.trim()) {
      setHighlightedText(transcript || '');
      return;
    }

    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const highlighted = transcript.replace(
      regex,
      '<mark class="bg-yellow-200 dark:bg-yellow-900">$1</mark>'
    );
    setHighlightedText(highlighted);
  }, [transcript, searchQuery]);

  if (!transcript) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Transcript
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Transcript is not available for this call.
          </p>
        </CardContent>
      </Card>
    );
  }

  const matchCount = searchQuery
    ? (transcript.match(new RegExp(searchQuery, 'gi')) || []).length
    : 0;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Call Transcript
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {searchable && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transcript..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
            {searchQuery && matchCount > 0 && (
              <Badge variant="secondary" className="mt-2">
                {matchCount} {matchCount === 1 ? 'match' : 'matches'} found
              </Badge>
            )}
          </div>
        )}
        <ScrollArea className="h-[500px]">
          <div
            className="prose prose-sm max-w-none text-sm leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: highlightedText || transcript }}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
