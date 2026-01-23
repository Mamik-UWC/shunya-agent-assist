import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  Phone,
  ClipboardList,
  BookOpen,
  Settings,
  BarChart3,
  Zap,
  Database,
  FileSearch,
  Brain,
  Monitor,
  Calendar,
  Shield,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";

export interface NavigationItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const adminNavigationItems: NavigationItem[] = [
  {
    title: "Onboarding",
    url: ROUTES.ADMIN.ONBOARDING,
    icon: Shield,
  },
  {
    title: "Knowledge",
    url: ROUTES.ADMIN.KNOWLEDGE,
    icon: BookOpen,
  },
  {
    title: "Intents",
    url: ROUTES.ADMIN.INTENTS,
    icon: Brain,
  },
  {
    title: "Features",
    url: ROUTES.ADMIN.FEATURES,
    icon: Settings,
  },
  {
    title: "Dashboards",
    url: ROUTES.ADMIN.DASHBOARDS,
    icon: BarChart3,
  },
  {
    title: "Automation",
    url: ROUTES.ADMIN.AUTOMATION,
    icon: Zap,
  },
  {
    title: "Data Retention",
    url: ROUTES.ADMIN.DATA_RETENTION,
    icon: Database,
  },
  {
    title: "Audit Logs",
    url: ROUTES.ADMIN.AUDIT_LOGS,
    icon: FileSearch,
  },
];

export const agentNavigationItems: NavigationItem[] = [
  {
    title: "Live Call",
    url: ROUTES.AGENT.LIVE_CALL,
    icon: Phone,
  },
  {
    title: "SOP",
    url: ROUTES.AGENT.SOP,
    icon: ClipboardList,
  },
  {
    title: "Chat Assistant",
    url: ROUTES.AGENT.CHAT,
    icon: MessageSquare,
  },
];

export const managerNavigationItems: NavigationItem[] = [
  {
    title: "Overview",
    url: ROUTES.MANAGER.OVERVIEW,
    icon: LayoutDashboard,
  },
  {
    title: "Agents",
    url: ROUTES.MANAGER.AGENTS,
    icon: Users,
  },
  {
    title: "Sessions",
    url: ROUTES.MANAGER.SESSIONS,
    icon: Calendar,
  },
  {
    title: "Live Monitoring",
    url: ROUTES.MANAGER.LIVE_MONITORING,
    icon: Monitor,
  },
  {
    title: "Intelligence",
    url: ROUTES.MANAGER.INTELLIGENCE,
    icon: BarChart3,
  },
];
