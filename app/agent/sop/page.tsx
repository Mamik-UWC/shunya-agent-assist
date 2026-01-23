'use client';

import * as React from 'react';
import {
  KnowledgeFilterBar,
  VersionSelector,
  SOPStepViewer,
  KnowledgeSearch,
} from '@/features/sop';
import { DocumentList } from '@/features/knowledge';
import type { SOPDocument } from '@/features/sop';
import type { KnowledgeArticle } from '@/features/knowledge';

export default function SOPPage() {
  const [documents, setDocuments] = React.useState<SOPDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Mock data - in production, fetch from API
  React.useEffect(() => {
    const mockDocuments: SOPDocument[] = [
      {
        id: 'doc-1',
        title: 'Customer Onboarding Process',
        content: 'Step-by-step guide for onboarding new customers...',
        category: 'Process',
        tags: ['onboarding', 'customer'],
      },
      {
        id: 'doc-2',
        title: 'Product Return Policy',
        content: 'Guidelines for handling product returns...',
        category: 'Policy',
        tags: ['returns', 'policy'],
      },
      {
        id: 'doc-3',
        title: 'Escalation Procedures',
        content: 'When and how to escalate customer issues...',
        category: 'Process',
        tags: ['escalation', 'support'],
      },
    ];
    setDocuments(mockDocuments);
  }, []);

  const categories = React.useMemo(() => {
    const cats = new Set(documents.map((doc) => doc.category).filter(Boolean));
    return Array.from(cats) as string[];
  }, [documents]);

  const tags = React.useMemo(() => {
    const allTags = documents.flatMap((doc) => doc.tags || []);
    return Array.from(new Set(allTags));
  }, [documents]);

  const filteredDocuments = React.useMemo(() => {
    return documents.filter((doc) => {
      if (selectedCategory && doc.category !== selectedCategory) return false;
      if (selectedTags.length > 0 && !selectedTags.some((tag) => doc.tags?.includes(tag)))
        return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          doc.title.toLowerCase().includes(query) ||
          doc.content.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [documents, selectedCategory, selectedTags, searchQuery]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedTags([]);
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">SOP & Knowledge Base</h1>
        <p className="text-muted-foreground">
          Access procedures, policies, and knowledge articles
        </p>
      </div>

      <KnowledgeFilterBar
        categories={categories}
        tags={tags}
        selectedCategory={selectedCategory}
        selectedTags={selectedTags}
        searchQuery={searchQuery}
        onCategoryChange={setSelectedCategory}
        onTagToggle={handleTagToggle}
        onSearchChange={setSearchQuery}
        onClearFilters={handleClearFilters}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <KnowledgeSearch
            documents={filteredDocuments}
            onDocumentSelect={(id) => console.log('Selected:', id)}
          />
          <DocumentList
            documents={filteredDocuments as KnowledgeArticle[]}
            onView={(id) => console.log('View:', id)}
          />
        </div>
        <div className="space-y-6">
          <VersionSelector
            versions={[
              {
                id: 'v1',
                version: '1.0',
                createdAt: new Date().toISOString(),
                createdBy: 'Admin',
                isCurrent: true,
                changeLog: 'Initial version',
              },
            ]}
          />
          <SOPStepViewer
            document={filteredDocuments[0]}
            steps={[
              {
                id: 'step-1',
                title: 'Identify Customer Need',
                description: 'Listen carefully and understand the customer requirement',
                order: 1,
                required: true,
              },
              {
                id: 'step-2',
                title: 'Provide Solution',
                description: 'Offer appropriate solution based on the need',
                order: 2,
                required: true,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
