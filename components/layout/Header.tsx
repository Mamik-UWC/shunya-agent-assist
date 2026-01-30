"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils/cn";
import { generateBreadcrumbs } from "@/lib/utils/breadcrumbs";

interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export function Header({ className, children, ...props }: HeaderProps) {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <header
      className={cn(
        "sticky top-0 z-20 w-full bg-background/80 backdrop-blur-md flex items-center justify-between px-6 py-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-foreground">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        )}
        {children}
      </div>
    </header>
  );
}
