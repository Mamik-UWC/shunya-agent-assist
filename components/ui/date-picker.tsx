'use client';

import * as React from 'react';
import { Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  min?: Date;
  max?: Date;
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  className,
  disabled,
  min,
  max,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    value ? formatDate(value) : ''
  );

  React.useEffect(() => {
    if (value) {
      setInputValue(formatDate(value));
    } else {
      setInputValue('');
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputValue(input);
    
    if (input) {
      const date = parseDate(input);
      if (date && isValidDate(date)) {
        onChange?.(date);
      }
    } else {
      onChange?.(undefined);
    }
  };

  const handleCalendarClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.valueAsDate;
    if (date) {
      onChange?.(date);
      setInputValue(formatDate(date));
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {value ? formatDate(value) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <Input
            type="date"
            value={inputValue}
            onChange={handleInputChange}
            onInput={handleCalendarClick}
            min={min ? formatDateForInput(min) : undefined}
            max={max ? formatDateForInput(max) : undefined}
            className="w-full"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDate(dateString: string): Date | null {
  const date = new Date(dateString);
  return isValidDate(date) ? date : null;
}

function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}
