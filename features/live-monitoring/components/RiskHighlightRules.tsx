'use client';

import * as React from 'react';
import { Settings, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export interface RiskRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  severity: 'low' | 'medium' | 'high';
  conditions: string[];
}

export interface RiskHighlightRulesProps {
  rules?: RiskRule[];
  onRuleToggle?: (ruleId: string, enabled: boolean) => void;
  className?: string;
}

const defaultRules: RiskRule[] = [
  {
    id: 'negative-sentiment',
    name: 'Negative Sentiment',
    description: 'Alert when customer sentiment is negative',
    enabled: true,
    severity: 'high',
    conditions: ['Sentiment score < 0.3'],
  },
  {
    id: 'long-duration',
    name: 'Long Call Duration',
    description: 'Alert when call exceeds 30 minutes',
    enabled: true,
    severity: 'medium',
    conditions: ['Duration > 30 minutes'],
  },
  {
    id: 'escalation-request',
    name: 'Escalation Request',
    description: 'Alert when customer requests escalation',
    enabled: true,
    severity: 'high',
    conditions: ['Escalation keyword detected'],
  },
  {
    id: 'compliance-risk',
    name: 'Compliance Risk',
    description: 'Alert on potential compliance issues',
    enabled: true,
    severity: 'high',
    conditions: ['Compliance keyword detected'],
  },
];

export function RiskHighlightRules({
  rules = defaultRules,
  onRuleToggle,
  className,
}: RiskHighlightRulesProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Risk Highlight Rules
        </CardTitle>
        <CardDescription>Configure risk detection rules for live calls</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="flex items-start justify-between p-3 border rounded-lg">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <AlertTriangle
                  className="h-4 w-4"
                  style={{
                    color:
                      rule.severity === 'high'
                        ? 'hsl(0, 84%, 60%)'
                        : rule.severity === 'medium'
                          ? 'hsl(30, 100%, 50%)'
                          : 'hsl(38, 92%, 50%)',
                  }}
                />
                <Label className="font-medium">{rule.name}</Label>
              </div>
              <p className="text-sm text-muted-foreground">{rule.description}</p>
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Conditions:</span>{' '}
                {rule.conditions.join(', ')}
              </div>
            </div>
            <Switch
              checked={rule.enabled}
              onCheckedChange={(checked) => onRuleToggle?.(rule.id, checked)}
            />
          </div>
        ))}
        <Button variant="outline" className="w-full">
          Add New Rule
        </Button>
      </CardContent>
    </Card>
  );
}
