'use client';

import { useState, useRef } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProcessingStatusIndicator, ProcessingStatus } from '@/components/layout/ProcessingStatusIndicator';

export interface DocumentUpload {
  file: File;
  title?: string;
  category?: string;
  tags?: string[];
}

export interface DocumentUploaderProps {
  onUpload?: (upload: DocumentUpload) => Promise<void>;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
}

export function DocumentUploader({
  onUpload,
  acceptedTypes = ['.pdf', '.doc', '.docx', '.txt', '.md'],
  maxSize = 10,
}: DocumentUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState<ProcessingStatus>('pending');
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setMessage(`File size exceeds ${maxSize}MB limit`);
      setStatus('failed');
      return;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      setMessage(`File type not supported. Accepted types: ${acceptedTypes.join(', ')}`);
      setStatus('failed');
      return;
    }

    setSelectedFile(file);
    setTitle(file.name.replace(/\.[^/.]+$/, ''));
    setStatus('pending');
    setMessage('');
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    if (!onUpload) {
      // Simulate upload for demo
      setStatus('processing');
      setMessage('Uploading document...');
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setStatus('completed');
        setMessage('Document uploaded successfully!');
        setTimeout(() => {
          setSelectedFile(null);
          setTitle('');
          setCategory('');
          setTags('');
          setStatus('pending');
          setMessage('');
          setProgress(0);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 2000);
      }, 2000);
      return;
    }

    try {
      setStatus('processing');
      setMessage('Uploading document...');
      setProgress(50);

      const upload: DocumentUpload = {
        file: selectedFile,
        title: title || undefined,
        category: category || undefined,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      };

      await onUpload(upload);

      setProgress(100);
      setStatus('completed');
      setMessage('Document uploaded successfully!');

      // Reset form
      setSelectedFile(null);
      setTitle('');
      setCategory('');
      setTags('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setStatus('failed');
      setMessage('Failed to upload document. Please try again.');
      console.error('Upload error:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>
          Upload knowledge base documents (Max size: {maxSize}MB)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProcessingStatusIndicator
          status={status}
          message={message}
          progress={progress}
        />

        <div className="space-y-2">
          <label htmlFor="fileInput" className="text-sm font-medium">
            Select File *
          </label>
          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleFileSelect}
            className="w-full px-3 py-2 border border-border rounded-md bg-background file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
          {selectedFile && (
            <p className="text-sm text-muted-foreground">
              Selected: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
            </p>
          )}
        </div>

        {selectedFile && (
          <>
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Document Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="Enter document title"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="e.g., SOP, FAQ, Policy"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                Tags (comma-separated)
              </label>
              <input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="tag1, tag2, tag3"
              />
            </div>

            <Button
              onClick={handleUpload}
              disabled={status === 'processing'}
              className="w-full"
            >
              {status === 'processing' ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
              {status === 'processing' ? 'Uploading...' : 'Upload Document'}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
