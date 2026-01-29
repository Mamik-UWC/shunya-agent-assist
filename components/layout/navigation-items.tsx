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
  LayoutGrid,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { PERMISSIONS } from "@/constants/permissions";

export interface NavigationItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  /** Optional permission required to show this item (RBAC). */
  permission?: string;
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
    permission: PERMISSIONS.VIEW_ANALYTICS,
  },
  {
    title: "Agents",
    url: ROUTES.MANAGER.AGENTS,
    icon: Users,
    permission: PERMISSIONS.VIEW_AGENTS,
  },
  {
    title: "Sessions",
    url: ROUTES.MANAGER.SESSIONS,
    icon: Calendar,
    permission: PERMISSIONS.VIEW_SESSIONS,
  },
  {
    title: "Live Monitoring",
    url: ROUTES.MANAGER.LIVE_MONITORING,
    icon: Monitor,
    permission: PERMISSIONS.LIVE_MONITORING,
  },
  {
    title: "Floor",
    url: ROUTES.MANAGER.FLOOR,
    icon: LayoutGrid,
    permission: PERMISSIONS.LIVE_MONITORING,
  },
  {
    title: "Intelligence",
    url: ROUTES.MANAGER.INTELLIGENCE,
    icon: BarChart3,
    permission: PERMISSIONS.VIEW_ANALYTICS,
  },
];
