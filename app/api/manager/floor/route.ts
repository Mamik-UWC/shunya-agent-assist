import { NextResponse } from "next/server";
import type { FloorCall, FloorRiskLevel, SentimentTrend } from "@/features/floor/types";

const QUEUES = ["Support", "Billing", "Sales", "Technical", "Retention"];
const INTENTS = ["Inquiry", "Escal.", "Upgrade", "Complaint", "Cancellation"];

/** Use same ids and names as /api/manager/agents for floor merge. */
const FLOOR_AGENTS = [
  { id: "1", name: "Sarah Johnson" },
  { id: "2", name: "Michael Chen" },
  { id: "3", name: "Emily Rodriguez" },
  { id: "4", name: "David Kim" },
  { id: "5", name: "Jessica Martinez" },
  { id: "6", name: "James Wilson" },
  { id: "7", name: "Amanda Brown" },
  { id: "8", name: "Robert Taylor" },
];

function generateFloorCalls(): FloorCall[] {
  const now = Date.now();
  const count = Math.floor(Math.random() * 5) + 3;
  const calls: FloorCall[] = [];

  for (let i = 0; i < count; i++) {
    const agent = FLOOR_AGENTS[Math.floor(Math.random() * FLOOR_AGENTS.length)];
    const startTime = new Date(now - Math.random() * 3600000);
    const duration = Math.floor((now - startTime.getTime()) / 1000);
    const queue = QUEUES[Math.floor(Math.random() * QUEUES.length)];
    const intent = INTENTS[Math.floor(Math.random() * INTENTS.length)];
    const sentimentScore = Math.round((Math.random() * 2 - 1) * 10) / 10;
    const trends: SentimentTrend[] = ["up", "down", "stable"];
    const sentimentTrend = trends[Math.floor(Math.random() * trends.length)];

    const hasHighRisk = sentimentScore < -0.5 || (intent === "Escal." && Math.random() > 0.4);
    const hasMediumRisk =
      !hasHighRisk && (sentimentScore < 0 || Math.random() > 0.6);
    const riskLevel: FloorRiskLevel = hasHighRisk
      ? "critical"
      : hasMediumRisk
        ? "warning"
        : "normal";

    calls.push({
      id: `call-${i + 1}`,
      agentId: agent.id,
      agentName: agent.name,
      startTime: startTime.toISOString(),
      duration,
      queue,
      intent,
      sentimentScore,
      sentimentTrend,
      riskLevel,
    });
  }

  return calls;
}

export async function GET() {
  const calls = generateFloorCalls();
  return NextResponse.json({ calls });
}
