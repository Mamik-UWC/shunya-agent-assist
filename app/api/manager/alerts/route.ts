import { NextResponse } from 'next/server';
import type { Alert } from '@/types/manager';

/** Mock recent alerts. In production: PostgreSQL audit_logs, real-time via WebSocket. */
function getMockAlerts(): Alert[] {
  const now = Date.now();
  return [
    {
      id: '1',
      severity: 'critical',
      type: 'Escalation',
      agentName: 'Mike P.',
      agentId: 'agent-1',
      sessionId: 'session-1',
      timestamp: now - 2 * 60 * 1000,
      message: 'Customer requested escalation',
    },
    {
      id: '2',
      severity: 'warning',
      type: 'Low Sentiment',
      agentName: 'John D.',
      agentId: 'agent-2',
      sessionId: 'session-2',
      timestamp: now - 5 * 60 * 1000,
      message: 'Sentiment dropped below threshold',
    },
  ];
}

export async function GET() {
  const alerts = getMockAlerts();
  return NextResponse.json({ alerts });
}
