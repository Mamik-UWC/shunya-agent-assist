import { NextResponse } from 'next/server';
import type { KPIMetrics, SentimentDataPoint, IntentDistribution, AgentLeaderboardEntry, SOPAdherenceMetrics, UpsellMetrics } from '@/types/manager';

// Mock data generators
function generateSentimentData(days: number = 30): SentimentDataPoint[] {
  const data: SentimentDataPoint[] = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      positive: Math.floor(Math.random() * 40) + 50,
      neutral: Math.floor(Math.random() * 30) + 20,
      negative: Math.floor(Math.random() * 20) + 5,
    });
  }
  
  return data;
}

function generateIntentDistribution(): IntentDistribution[] {
  const intents = [
    'Billing Inquiry',
    'Technical Support',
    'Product Information',
    'Complaint',
    'Cancellation',
    'Upgrade Request',
    'General Inquiry',
    'Other',
  ];
  
  const total = 1000;
  let remaining = total;
  
  return intents.map((intent, index) => {
    const count = index === intents.length - 1 
      ? remaining 
      : Math.floor(Math.random() * (remaining / (intents.length - index))) + 10;
    remaining -= count;
    
    return {
      intent,
      count,
      percentage: (count / total) * 100,
    };
  });
}

function generateLeaderboard(): AgentLeaderboardEntry[] {
  const agents = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Michael Chen' },
    { id: '3', name: 'Emily Rodriguez' },
    { id: '4', name: 'David Kim' },
    { id: '5', name: 'Jessica Martinez' },
    { id: '6', name: 'James Wilson' },
    { id: '7', name: 'Amanda Brown' },
    { id: '8', name: 'Robert Taylor' },
  ];
  
  return agents.map((agent, index) => ({
    agentId: agent.id,
    agentName: agent.name,
    sessions: Math.floor(Math.random() * 200) + 50,
    csat: Math.random() * 0.3 + 4.0,
    fcr: Math.random() * 0.2 + 0.7,
    avgHandleTime: Math.floor(Math.random() * 300) + 300,
    rank: index + 1,
  })).sort((a, b) => b.csat - a.csat);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateFrom = searchParams.get('dateFrom');
  const dateTo = searchParams.get('dateTo');
  
  // Calculate days for sentiment data
  let days = 30;
  if (dateFrom && dateTo) {
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
  }
  
  const kpi: KPIMetrics = {
    sessions: {
      total: 847,
      change: 12.5,
      trend: 'up',
    },
    sentiment: {
      score: 0.42,
      change: 0.05,
      trend: 'up',
    },
    csat: {
      score: 82,
      change: 2,
      trend: 'up',
    },
    sop: {
      percentage: 91,
      change: 1.5,
      trend: 'up',
    },
    fcr: {
      rate: 0.78,
      change: 0.05,
      trend: 'up',
    },
  };
  
  const sentimentTrend = generateSentimentData(days);
  const intentDistribution = generateIntentDistribution();
  const leaderboard = generateLeaderboard();
  
  const sopAdherence: SOPAdherenceMetrics = {
    overall: 87.5,
    byCategory: [
      { category: 'Greeting', score: 95 },
      { category: 'Problem Resolution', score: 88 },
      { category: 'Documentation', score: 82 },
      { category: 'Closing', score: 85 },
    ],
    trend: 2.3,
  };
  
  const upsellMetrics: UpsellMetrics = {
    opportunities: 342,
    conversions: 89,
    revenue: 45600,
    conversionRate: 26.0,
    avgValue: 512.36,
  };
  
  const response = NextResponse.json({
    kpi,
    sentimentTrend,
    intentDistribution,
    leaderboard,
    sopAdherence,
    upsellMetrics,
  });
  response.headers.set('Cache-Control', 'private, max-age=300');
  return response;
}
