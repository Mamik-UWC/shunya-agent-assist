import { NextResponse } from 'next/server';
import type { AgentPerformance } from '@/types/manager';

function generateAgentPerformance(agentId: string): AgentPerformance {
  const agents = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.j@example.com' },
    { id: '2', name: 'Michael Chen', email: 'michael.c@example.com' },
    { id: '3', name: 'Emily Rodriguez', email: 'emily.r@example.com' },
    { id: '4', name: 'David Kim', email: 'david.k@example.com' },
    { id: '5', name: 'Jessica Martinez', email: 'jessica.m@example.com' },
  ];
  
  const agent = agents.find(a => a.id === agentId) || agents[0];
  
  // Generate trend data (last 30 days)
  const trends = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    trends.push({
      date: date.toISOString().split('T')[0],
      csat: Math.random() * 0.5 + 4.0,
      fcr: Math.random() * 0.2 + 0.7,
      handleTime: Math.floor(Math.random() * 200) + 300,
    });
  }
  
  // Generate QA compliance data
  const qaDetails = [];
  for (let i = 0; i < 10; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i * 3);
    qaDetails.push({
      date: date.toISOString().split('T')[0],
      score: Math.random() * 20 + 80,
      evaluator: ['Manager A', 'Manager B', 'QA Team'][Math.floor(Math.random() * 3)],
      notes: i % 3 === 0 ? 'Excellent performance' : undefined,
    });
  }
  
  const passed = Math.floor(qaDetails.length * 0.8);
  
  // Generate upsell performance
  const upsellPerformance = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    upsellPerformance.push({
      date: date.toISOString().split('T')[0],
      opportunities: Math.floor(Math.random() * 10) + 5,
      conversions: Math.floor(Math.random() * 5) + 1,
      revenue: Math.floor(Math.random() * 2000) + 500,
    });
  }
  
  return {
    agentId: agent.id,
    agentName: agent.name,
    email: agent.email,
    summary: {
      totalSessions: Math.floor(Math.random() * 200) + 100,
      avgCSAT: Math.random() * 0.5 + 4.0,
      avgFCR: Math.random() * 0.2 + 0.7,
      avgHandleTime: Math.floor(Math.random() * 200) + 300,
      totalUpsells: Math.floor(Math.random() * 50) + 20,
    },
    trends,
    qaCompliance: {
      score: Math.random() * 15 + 85,
      totalEvaluations: qaDetails.length,
      passed,
      failed: qaDetails.length - passed,
      details: qaDetails,
    },
    upsellPerformance,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get('agentId');
  
  if (agentId) {
    // Return single agent performance
    const performance = generateAgentPerformance(agentId);
    return NextResponse.json(performance);
  }
  
  // Return list of agents
  const agents = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.j@example.com', avatar: undefined },
    { id: '2', name: 'Michael Chen', email: 'michael.c@example.com', avatar: undefined },
    { id: '3', name: 'Emily Rodriguez', email: 'emily.r@example.com', avatar: undefined },
    { id: '4', name: 'David Kim', email: 'david.k@example.com', avatar: undefined },
    { id: '5', name: 'Jessica Martinez', email: 'jessica.m@example.com', avatar: undefined },
    { id: '6', name: 'James Wilson', email: 'james.w@example.com', avatar: undefined },
    { id: '7', name: 'Amanda Brown', email: 'amanda.b@example.com', avatar: undefined },
    { id: '8', name: 'Robert Taylor', email: 'robert.t@example.com', avatar: undefined },
  ];
  
  return NextResponse.json({ agents });
}
