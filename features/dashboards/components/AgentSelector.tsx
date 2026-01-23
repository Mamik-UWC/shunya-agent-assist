'use client';

import * as React from 'react';
import { Combobox, type ComboboxOption } from '@/components/ui/combobox';

export interface Agent {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AgentSelectorProps {
  agents?: Agent[];
  value?: string;
  onValueChange?: (agentId: string) => void;
  placeholder?: string;
  className?: string;
}

export function AgentSelector({
  agents = [],
  value,
  onValueChange,
  placeholder = 'Select an agent...',
  className,
}: AgentSelectorProps) {
  const options: ComboboxOption[] = React.useMemo(
    () =>
      agents.map((agent) => ({
        value: agent.id,
        label: agent.name,
      })),
    [agents]
  );

  return (
    <Combobox
      options={options}
      value={value}
      onValueChange={onValueChange}
      placeholder={placeholder}
      className={className}
    />
  );
}
