"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface FooterProps extends React.ComponentPropsWithoutRef<'footer'> {
  children?: React.ReactNode;
}

export function Footer({ className, children, ...props }: FooterProps) {
  return (
    <footer
      className={cn(
        "w-full bg-background px-6 py-4 text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      {children || <p>&copy; {new Date().getFullYear()} Shunya Agent Assist</p>}
    </footer>
  );
}
