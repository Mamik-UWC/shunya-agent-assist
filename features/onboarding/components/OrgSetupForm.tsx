'use client';

import { useState } from 'react';
import { RotateCcw, Check, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProcessingStatusIndicator, ProcessingStatus } from '@/components/layout/ProcessingStatusIndicator';
import { orgSetupFormConfig, FormFieldConfig } from '../config/formFields';

export interface OrgSetupFormData {
  organizationName: string;
  domain: string;
  industry: string;
  timezone: string;
  contactEmail: string;
  contactPhone?: string;
}

export interface OrgSetupFormProps {
  onSubmit?: (data: OrgSetupFormData) => Promise<void>;
  initialData?: Partial<OrgSetupFormData>;
}

export function OrgSetupForm({ onSubmit, initialData }: OrgSetupFormProps) {
  // Initialize form data from config, with initialData taking precedence
  const getInitialFormData = (): OrgSetupFormData => {
    const defaultData: Partial<OrgSetupFormData> = {};
    orgSetupFormConfig.fields.forEach((field) => {
      defaultData[field.id] = (field.defaultValue || '') as any;
    });
    return {
      ...defaultData,
      ...initialData,
    } as OrgSetupFormData;
  };

  const [formData, setFormData] = useState<OrgSetupFormData>(getInitialFormData());

  const [status, setStatus] = useState<ProcessingStatus>('pending');
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!onSubmit) {
      // Simulate processing for demo
      setStatus('processing');
      setMessage('Setting up your organization...');
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
      
      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setStatus('completed');
        setMessage('Organization setup completed successfully!');
      }, 3000);
      return;
    }

    try {
      setStatus('processing');
      setMessage('Submitting organization details...');
      setProgress(50);
      
      await onSubmit(formData);
      
      setProgress(100);
      setStatus('completed');
      setMessage('Organization setup completed successfully!');
    } catch (error) {
      setStatus('failed');
      setMessage('Failed to setup organization. Please try again.');
      console.error('Organization setup error:', error);
    }
  };

  const handleChange = (field: keyof OrgSetupFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const renderField = (field: FormFieldConfig) => {
    const fieldValue = formData[field.id] || '';
    const fieldId = field.id;

    return (
      <div key={field.id} className="space-y-2">
        <label htmlFor={fieldId} className="text-sm font-medium">
          {field.label} {field.required && '*'}
        </label>
        {field.type === 'select' ? (
          <select
            id={fieldId}
            required={field.required}
            value={fieldValue}
            onChange={handleChange(field.id)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background"
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={fieldId}
            type={field.type}
            required={field.required}
            value={fieldValue}
            onChange={handleChange(field.id)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background"
            placeholder={field.placeholder}
          />
        )}
      </div>
    );
  };

  const getDefaultFormData = (): OrgSetupFormData => {
    const defaultData: Partial<OrgSetupFormData> = {};
    orgSetupFormConfig.fields.forEach((field) => {
      defaultData[field.id] = (field.defaultValue || '') as any;
    });
    return defaultData as OrgSetupFormData;
  };

  return (
    <div className="space-y-6">
      <ProcessingStatusIndicator
        status={status}
        message={message}
        progress={progress}
      />

      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>
            Enter your organization information to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orgSetupFormConfig.fields.map((field) => renderField(field))}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData(getDefaultFormData());
                  setStatus('pending');
                  setMessage('');
                  setProgress(0);
                }}
              >
                <RotateCcw className="size-4" />
                Reset
              </Button>
              <Button
                type="submit"
                disabled={status === 'processing'}
              >
                {status === 'processing' ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Check className="size-4" />
                )}
                {status === 'processing' ? 'Setting Up...' : 'Complete Setup'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
