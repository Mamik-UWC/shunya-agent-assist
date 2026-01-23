"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  adminNavigationItems,
  agentNavigationItems,
  managerNavigationItems,
  type NavigationItem,
} from "./navigation-items";
import { cn } from "@/lib/utils/cn";

interface AppSidebarProps {
  type: "admin" | "agent" | "manager" | "all";
  title?: string;
}

function getNavigationItems(type: "admin" | "agent" | "manager" | "all"): NavigationItem[] {
  switch (type) {
    case "admin":
      return adminNavigationItems;
    case "agent":
      return agentNavigationItems;
    case "manager":
      return managerNavigationItems;
    case "all":
      return [...adminNavigationItems, ...agentNavigationItems, ...managerNavigationItems];
    default:
      return [];
  }
}

function renderMenuItem(item: NavigationItem, pathname: string | null, isCollapsed: boolean) {
  const Icon = item.icon;
  const isActive = pathname === item.url || pathname?.startsWith(item.url + "/");
  
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.title}
      >
        <Link href={item.url}>
          <Icon className="h-4 w-4" />
          <motion.span
            initial={false}
            animate={{
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : "auto",
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="overflow-hidden whitespace-nowrap"
          >
            {item.title}
          </motion.span>
          {item.badge && (
            <motion.span
              initial={false}
              animate={{
                opacity: isCollapsed ? 0 : 1,
                width: isCollapsed ? 0 : "auto",
              }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground overflow-hidden"
            >
              {item.badge}
            </motion.span>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar({ type, title }: AppSidebarProps) {
  const pathname = usePathname();
  const items = getNavigationItems(type);
  const defaultTitle = type === "admin" ? "Admin Portal" : type === "agent" ? "Agent Interface" : type === "manager" ? "Manager Dashboard" : "All Routes";
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <div className="flex h-16 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <span className="text-sm font-bold">S</span>
          </div>
          <motion.div
            initial={false}
            animate={{
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : "auto",
            }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="flex flex-col overflow-hidden"
          >
            <span className="text-sm font-semibold whitespace-nowrap">{title || defaultTitle}</span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">Shunya</span>
          </motion.div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {type === "all" ? (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Admin</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminNavigationItems.map((item) => renderMenuItem(item, pathname, isCollapsed))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Agent</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {agentNavigationItems.map((item) => renderMenuItem(item, pathname, isCollapsed))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Manager</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {managerNavigationItems.map((item) => renderMenuItem(item, pathname, isCollapsed))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        ) : (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => renderMenuItem(item, pathname, isCollapsed))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
