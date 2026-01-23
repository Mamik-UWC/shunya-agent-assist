'use client';

import * as React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ExportButtonProps {
  onExport?: () => void;
  data?: any[];
  filename?: string;
  className?: string;
}

export function ExportButton({
  onExport,
  data = [],
  filename = 'sessions',
  className,
}: ExportButtonProps) {
  const handleExport = () => {
    if (onExport) {
      onExport();
      return;
    }

    if (data.length === 0) {
      return;
    }

    // Convert data to CSV
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            if (value === null || value === undefined) return '';
            if (typeof value === 'object') return JSON.stringify(value);
            return String(value).replace(/,/g, ';');
          })
          .join(',')
      ),
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="outline" size="sm" onClick={handleExport} className={className}>
      <Download className="mr-2 h-4 w-4" />
      Export CSV
    </Button>
  );
}
