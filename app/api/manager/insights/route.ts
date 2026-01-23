import { NextResponse } from 'next/server';
import type { IntelligenceInsights } from '@/types/manager';

export async function GET() {
  const rootCauses = [
    {
      category: 'Product Knowledge Gap',
      count: 45,
      percentage: 32.1,
      examples: [
        'Agent unable to explain product features',
        'Incorrect information provided',
        'Lack of product training',
      ],
    },
    {
      category: 'Communication Issues',
      count: 38,
      percentage: 27.1,
      examples: [
        'Poor active listening',
        'Unclear explanations',
        'Language barriers',
      ],
    },
    {
      category: 'Process Adherence',
      count: 28,
      percentage: 20.0,
      examples: [
        'Skipped required steps',
        'Incorrect documentation',
        'Non-standard procedures',
      ],
    },
    {
      category: 'Technical Problems',
      count: 19,
      percentage: 13.6,
      examples: [
        'System downtime',
        'Slow response times',
        'Integration issues',
      ],
    },
    {
      category: 'Other',
      count: 10,
      percentage: 7.2,
      examples: [
        'External factors',
        'Customer-related issues',
      ],
    },
  ];
  
  const failureReasons = [
    {
      reason: 'Insufficient product knowledge',
      frequency: 45,
      impact: 'high' as const,
      affectedAgents: ['Agent 3', 'Agent 7', 'Agent 12'],
    },
    {
      reason: 'Poor communication skills',
      frequency: 38,
      impact: 'high' as const,
      affectedAgents: ['Agent 5', 'Agent 8'],
    },
    {
      reason: 'Process non-compliance',
      frequency: 28,
      impact: 'medium' as const,
      affectedAgents: ['Agent 2', 'Agent 6', 'Agent 9', 'Agent 11'],
    },
    {
      reason: 'Technical system issues',
      frequency: 19,
      impact: 'medium' as const,
      affectedAgents: ['All agents'],
    },
    {
      reason: 'Inadequate follow-up',
      frequency: 15,
      impact: 'low' as const,
      affectedAgents: ['Agent 4', 'Agent 10'],
    },
  ];
  
  const trainingRecommendations = [
    {
      agentId: '3',
      agentName: 'Emily Rodriguez',
      area: 'Product Knowledge',
      priority: 'high' as const,
      description: 'Multiple instances of incorrect product information provided to customers',
      suggestedTraining: [
        'Product Training Module 1',
        'Advanced Product Features',
        'Product FAQ Deep Dive',
      ],
    },
    {
      agentId: '7',
      agentName: 'Amanda Brown',
      area: 'Product Knowledge',
      priority: 'high' as const,
      description: 'Struggles with explaining complex product features',
      suggestedTraining: [
        'Product Training Module 2',
        'Technical Product Overview',
      ],
    },
    {
      agentId: '5',
      agentName: 'Jessica Martinez',
      area: 'Communication Skills',
      priority: 'high' as const,
      description: 'Needs improvement in active listening and clarity',
      suggestedTraining: [
        'Active Listening Workshop',
        'Communication Excellence',
      ],
    },
    {
      area: 'Process Adherence',
      priority: 'medium' as const,
      description: 'Multiple agents skipping required documentation steps',
      suggestedTraining: [
        'Documentation Best Practices',
        'Process Compliance Training',
      ],
    },
    {
      area: 'Upselling Techniques',
      priority: 'low' as const,
      description: 'Opportunity to improve upsell conversion rates',
      suggestedTraining: [
        'Upselling Strategies',
        'Customer Needs Assessment',
      ],
    },
  ];
  
  const insights: IntelligenceInsights = {
    rootCauses,
    failureReasons,
    trainingRecommendations,
  };
  
  return NextResponse.json(insights);
}
