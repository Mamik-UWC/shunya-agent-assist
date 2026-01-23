import { NextResponse } from 'next/server';
import type { LiveCall } from '@/types/manager';

function generateLiveCalls(): LiveCall[] {
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
  
  const calls: LiveCall[] = [];
  const now = Date.now();
  
  for (let i = 0; i < Math.floor(Math.random() * 5) + 3; i++) {
    const agent = agents[Math.floor(Math.random() * agents.length)];
    const startTime = new Date(now - Math.random() * 3600000); // Last hour
    const duration = Math.floor((now - startTime.getTime()) / 1000);
    const intent = intents[Math.floor(Math.random() * intents.length)];
    const sentiment = ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)] as 'positive' | 'neutral' | 'negative';
    
    // Generate risk flags
    const riskFlags = [];
    if (sentiment === 'negative' && Math.random() > 0.5) {
      riskFlags.push({
        type: 'sentiment' as const,
        severity: 'high' as const,
        message: 'Negative sentiment detected',
      });
    }
    if (duration > 1800 && Math.random() > 0.6) {
      riskFlags.push({
        type: 'duration' as const,
        severity: 'medium' as const,
        message: 'Call duration exceeds 30 minutes',
      });
    }
    if (Math.random() > 0.8) {
      riskFlags.push({
        type: 'escalation' as const,
        severity: 'low' as const,
        message: 'Customer requested escalation',
      });
    }
    
    calls.push({
      id: `call-${i + 1}`,
      agentId: agent.id,
      agentName: agent.name,
      customerId: `customer-${Math.floor(Math.random() * 1000)}`,
      customerName: `Customer ${i + 1}`,
      startTime: startTime.toISOString(),
      duration,
      intent,
      sentiment,
      riskFlags,
      status: ['active', 'on-hold', 'transferring'][Math.floor(Math.random() * 3)] as 'active' | 'on-hold' | 'transferring',
    });
  }
  
  return calls;
}

export async function GET() {
  const calls = generateLiveCalls();
  return NextResponse.json({ calls });
}
