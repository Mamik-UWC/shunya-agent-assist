import { NextResponse } from 'next/server';
import type { CallVolumeBucket } from '@/types/manager';

/** Mock call volume by time bucket. In production: TimescaleDB continuous aggregates, 5-min cache. */
function generateCallVolumeTrends(range: '24h' | '7d' | '30d'): CallVolumeBucket[] {
  const now = new Date();
  const data: CallVolumeBucket[] = [];

  if (range === '24h') {
    for (let i = 23; i >= 0; i--) {
      const d = new Date(now);
      d.setHours(d.getHours() - i);
      d.setMinutes(0, 0, 0);
      data.push({
        bucket: d.toISOString().slice(0, 13) + ':00',
        volume: Math.floor(Math.random() * 40) + 20,
      });
    }
  } else {
    const days = range === '7d' ? 7 : 30;
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      data.push({
        bucket: dateStr,
        volume: Math.floor(Math.random() * 80) + 40,
      });
    }
  }

  return data;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = (searchParams.get('range') || '7d') as '24h' | '7d' | '30d';
  if (!['24h', '7d', '30d'].includes(range)) {
    return NextResponse.json({ error: 'Invalid range' }, { status: 400 });
  }

  const trends = generateCallVolumeTrends(range);
  const response = NextResponse.json({ trends });
  response.headers.set('Cache-Control', 'private, max-age=300');
  return response;
}
