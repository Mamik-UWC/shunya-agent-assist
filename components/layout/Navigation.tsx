"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface NavigationItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface NavigationProps {
  items: NavigationItem[];
  className?: string;
}

export function Navigation({ items, className }: NavigationProps) {
  return (
    <nav className={cn("flex flex-col space-y-1 p-4", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {item.icon && <span>{item.icon}</span>}
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
