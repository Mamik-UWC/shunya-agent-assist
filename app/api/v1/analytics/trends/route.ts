import { NextResponse } from 'next/server';

const CACHE_MAX_AGE = '300'; // 5 minutes

/** Spec: GET /api/v1/analytics/trends — call volume (TimescaleDB continuous aggregates). Proxies to manager analytics/trends. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = new URL(request.url).origin;
  const query = searchParams.toString();
  const url = `${origin}/api/manager/analytics/trends${query ? `?${query}` : ''}`;

  const res = await fetch(url);
  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch trends' },
      { status: res.status }
    );
  }
  const data = await res.json();
  const response = NextResponse.json(data);
  response.headers.set('Cache-Control', `private, max-age=${CACHE_MAX_AGE}`);
  return response;
}
