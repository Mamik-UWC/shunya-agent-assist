import { NextResponse } from 'next/server';
import type { SessionFilters } from '@/types/manager';

interface SessionListItem {
  id: string;
  agentId: string;
  agentName: string;
  customerId?: string;
  customerName?: string;
  startTime: string;
  endTime?: string;
  duration: number;
  status: 'active' | 'completed' | 'cancelled';
  intent?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  csat?: number;
  fcr: boolean;
}

function generateSessions(filters?: SessionFilters): SessionListItem[] {
  const agents = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Michael Chen' },
    { id: '3', name: 'Emily Rodriguez' },
    { id: '4', name: 'David Kim' },
    { id: '5', name: 'Jessica Martinez' },
  ];
  
  const intents = [
    'Billing Inquiry',
    'Technical Support',
    'Product Information',
    'Complaint',
    'Cancellation',
  ];
  
  const sentiments: Array<'positive' | 'neutral' | 'negative'> = ['positive', 'neutral', 'negative'];
  const statuses: Array<'active' | 'completed' | 'cancelled'> = ['active', 'completed', 'cancelled'];
  
  const sessions: SessionListItem[] = [];
  const now = new Date();
  
  for (let i = 0; i < 50; i++) {
    const agent = agents[Math.floor(Math.random() * agents.length)];
    const startTime = new Date(now);
    startTime.setHours(startTime.getHours() - Math.floor(Math.random() * 720)); // Last 30 days
    const duration = Math.floor(Math.random() * 1800) + 120; // 2-32 minutes
    const endTime = new Date(startTime.getTime() + duration * 1000);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const intent = intents[Math.floor(Math.random() * intents.length)];
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    
    // Apply filters
    if (filters?.agentId && agent.id !== filters.agentId) continue;
    if (filters?.intent && intent !== filters.intent) continue;
    if (filters?.sentiment && sentiment !== filters.sentiment) continue;
    if (filters?.status && status !== filters.status) continue;
    if (filters?.dateFrom && startTime < new Date(filters.dateFrom)) continue;
    if (filters?.dateTo && startTime > new Date(filters.dateTo)) continue;
    
    sessions.push({
      id: `session-${i + 1}`,
      agentId: agent.id,
      agentName: agent.name,
      customerId: `customer-${Math.floor(Math.random() * 1000)}`,
      customerName: `Customer ${i + 1}`,
      startTime: startTime.toISOString(),
      endTime: status === 'completed' ? endTime.toISOString() : undefined,
      duration,
      status,
      intent,
      sentiment: status === 'completed' ? sentiment : undefined,
      csat: status === 'completed' && Math.random() > 0.3 ? Math.random() * 1 + 4.0 : undefined,
      fcr: Math.random() > 0.4,
    });
  }
  
  return sessions.sort((a, b) => 
    new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const filters: SessionFilters = {
    dateFrom: searchParams.get('dateFrom') || undefined,
    dateTo: searchParams.get('dateTo') || undefined,
    agentId: searchParams.get('agentId') || undefined,
    intent: searchParams.get('intent') || undefined,
    sentiment: searchParams.get('sentiment') as 'positive' | 'neutral' | 'negative' | undefined,
    status: searchParams.get('status') as 'active' | 'completed' | 'cancelled' | undefined,
    search: searchParams.get('search') || undefined,
  };
  
  const sessions = generateSessions(filters);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return NextResponse.json({
    sessions: sessions.slice(start, end),
    pagination: {
      page,
      limit,
      total: sessions.length,
      totalPages: Math.ceil(sessions.length / limit),
    },
  });
}
