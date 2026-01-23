"use client";

import { cn } from "@/lib/utils/cn";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  return (
    <aside
      className={cn("bg-sidebar h-full w-64 flex flex-col", className)}
      {...props}
    >
      {children}
    </aside>
  );
}
