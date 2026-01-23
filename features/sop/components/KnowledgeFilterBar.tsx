'use client';

import * as React from 'react';
import { Filter, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface KnowledgeFilterBarProps {
  categories?: string[];
  tags?: string[];
  selectedCategory?: string;
  selectedTags?: string[];
  searchQuery?: string;
  onCategoryChange?: (category: string) => void;
  onTagToggle?: (tag: string) => void;
  onSearchChange?: (query: string) => void;
  onClearFilters?: () => void;
  className?: string;
}

export function KnowledgeFilterBar({
  categories = [],
  tags = [],
  selectedCategory,
  selectedTags = [],
  searchQuery = '',
  onCategoryChange,
  onTagToggle,
  onSearchChange,
  onClearFilters,
  className,
}: KnowledgeFilterBarProps) {
  const hasActiveFilters =
    selectedCategory || selectedTags.length > 0 || searchQuery.trim().length > 0;

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters</span>
            {hasActiveFilters && onClearFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="ml-auto h-7"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Search</label>
              <Input
                placeholder="Search knowledge base..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
            {categories.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Category</label>
                <Select
                  value={selectedCategory || 'all'}
                  onValueChange={(value) => onCategoryChange?.(value === 'all' ? '' : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {tags.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <Badge
                        key={tag}
                        variant={isSelected ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => onTagToggle?.(tag)}
                      >
                        {tag}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
