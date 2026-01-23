'use client';

import { VersionHistoryPanel } from '@/components/layout/VersionHistoryPanel';
import { AuditTrailViewer } from '@/components/layout/AuditTrailViewer';
import { DocumentUploader } from './DocumentUploader';
import { DocumentList } from './DocumentList';
import type { KnowledgeArticle } from '../types';
import type { Version } from '@/components/layout/VersionHistoryPanel';
import type { AuditTrailEntry } from '@/components/layout/AuditTrailViewer';

export interface KnowledgeManagementProps {
  documents?: KnowledgeArticle[];
  versions?: Version[];
  auditEntries?: AuditTrailEntry[];
}

export function KnowledgeManagement({
  documents = [],
  versions = [],
  auditEntries = [],
}: KnowledgeManagementProps) {
  const handleView = (id: string) => {
    console.log('View document:', id);
    // TODO: Implement navigation or modal
  };

  const handleEdit = (id: string) => {
    console.log('Edit document:', id);
    // TODO: Implement edit functionality
  };

  const handleDelete = (id: string) => {
    console.log('Delete document:', id);
    // TODO: Implement delete with confirmation
  };

  const handleRollback = (versionId: string) => {
    console.log('Rollback to version:', versionId);
    // TODO: Implement rollback functionality
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <DocumentUploader />
        <DocumentList
          documents={documents}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <div className="space-y-6">
        <VersionHistoryPanel
          resourceId="knowledge-base"
          resourceType="knowledge base"
          versions={versions}
          onRollback={handleRollback}
        />
        <AuditTrailViewer
          resourceId="knowledge-base"
          resourceType="knowledge base"
          entries={auditEntries}
          limit={5}
        />
      </div>
    </div>
  );
}
