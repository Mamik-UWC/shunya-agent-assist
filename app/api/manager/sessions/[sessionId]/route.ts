import { NextResponse } from 'next/server';
import type { SessionDetail } from '@/types/manager';

function generateSessionDetail(sessionId: string): SessionDetail {
  const agents = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Michael Chen' },
    { id: '3', name: 'Emily Rodriguez' },
  ];
  
  const agent = agents[Math.floor(Math.random() * agents.length)];
  const now = new Date();
  const startTime = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
  const duration = Math.floor(Math.random() * 1800) + 300;
  const endTime = new Date(startTime.getTime() + duration * 1000);
  
  // Generate sentiment timeline
  const sentimentTimeline = [];
  const interval = duration / 20;
  for (let i = 0; i < 20; i++) {
    sentimentTimeline.push({
      timestamp: i * interval,
      sentiment: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)] as 'positive' | 'neutral' | 'negative',
      confidence: Math.random() * 0.3 + 0.7,
    });
  }
  
  // Generate QA metrics
  const qaCriteria = [
    { name: 'Greeting', maxScore: 10 },
    { name: 'Active Listening', maxScore: 15 },
    { name: 'Problem Resolution', maxScore: 20 },
    { name: 'Professionalism', maxScore: 15 },
    { name: 'Documentation', maxScore: 10 },
    { name: 'Closing', maxScore: 10 },
  ];
  
  const criteria = qaCriteria.map(c => ({
    name: c.name,
    score: Math.floor(Math.random() * (c.maxScore * 0.3)) + c.maxScore * 0.7,
    maxScore: c.maxScore,
    notes: Math.random() > 0.7 ? 'Good performance' : undefined,
  }));
  
  const totalScore = criteria.reduce((sum, c) => sum + c.score, 0);
  const maxTotal = criteria.reduce((sum, c) => sum + c.maxScore, 0);
  
  // Generate upsell analysis
  const upsellDetails = [];
  const upsellCount = Math.floor(Math.random() * 3);
  for (let i = 0; i < upsellCount; i++) {
    upsellDetails.push({
      timestamp: Math.random() * duration,
      product: ['Premium Plan', 'Add-on Service', 'Extended Warranty'][Math.floor(Math.random() * 3)],
      status: ['opportunity', 'attempted', 'successful', 'declined'][Math.floor(Math.random() * 4)] as 'opportunity' | 'attempted' | 'successful' | 'declined',
      value: Math.random() > 0.5 ? Math.floor(Math.random() * 500) + 100 : undefined,
    });
  }
  
  return {
    id: sessionId,
    agentId: agent.id,
    agentName: agent.name,
    customerId: `customer-${Math.floor(Math.random() * 1000)}`,
    customerName: `Customer ${Math.floor(Math.random() * 100)}`,
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    duration,
    status: 'completed',
    intent: 'Billing Inquiry',
    sentiment: 'positive',
    summary: 'Customer called regarding billing inquiry. Issue was resolved successfully. Customer expressed satisfaction with the service.',
    transcript: 'Agent: Hello, thank you for calling. How can I help you today?\nCustomer: Hi, I have a question about my bill...',
    metadata: {
      channel: 'phone',
      queue: 'Billing',
      tags: ['billing', 'resolved', 'satisfied'],
    },
    metrics: {
      csat: Math.random() * 1 + 4.0,
      fcr: true,
      handleTime: duration,
      talkTime: Math.floor(duration * 0.9),
      holdTime: Math.floor(duration * 0.1),
    },
    sentimentTimeline,
    qaMetrics: {
      score: (totalScore / maxTotal) * 100,
      evaluator: 'Manager A',
      evaluatedAt: endTime.toISOString(),
      criteria,
    },
    coachingInsights: {
      strengths: [
        'Excellent active listening skills',
        'Clear and professional communication',
      ],
      improvements: [
        'Could improve documentation speed',
        'Consider more proactive upselling',
      ],
      recommendations: [
        'Complete advanced documentation training',
        'Review upsell opportunity guidelines',
      ],
    },
    upsellAnalysis: {
      opportunities: upsellCount,
      attempted: upsellDetails.filter(d => d.status !== 'opportunity').length,
      successful: upsellDetails.filter(d => d.status === 'successful').length,
      revenue: upsellDetails
        .filter(d => d.value)
        .reduce((sum, d) => sum + (d.value || 0), 0),
      details: upsellDetails,
    },
  };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const session = generateSessionDetail(sessionId);
  return NextResponse.json(session);
}
