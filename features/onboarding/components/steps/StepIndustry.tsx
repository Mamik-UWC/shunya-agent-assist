"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  Building2,
  Globe,
  Cpu,
  Stethoscope,
  ShoppingCart,
  Landmark,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils/cn";

const INDUSTRY_OPTIONS = [
  { value: "technology", label: "Technology", icon: Cpu },
  { value: "healthcare", label: "Healthcare", icon: Stethoscope },
  { value: "finance", label: "Finance", icon: Landmark },
  { value: "retail", label: "Retail", icon: ShoppingCart },
  { value: "telecommunications", label: "Telecommunications", icon: Globe },
  { value: "other", label: "Other", icon: Building2 },
];

export function StepIndustry() {
  const form = useFormContext();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">
          What industry are you in?
        </h2>
        <p className="text-muted-foreground mt-2">
          This helps us customize the agent&apos;s knowledge base.
        </p>
      </div>

      <FormField
        control={form.control}
        name="industry"
        render={({ field }) => (
          <FormItem>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {INDUSTRY_OPTIONS.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.div
                    key={option.value}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onClick={() => field.onChange(option.value)}
                    className={cn(
                      "cursor-pointer rounded-xl border p-4 flex flex-col items-center justify-center gap-3 transition-all h-32 text-center",
                      field.value === option.value
                        ? "outline-offset-4  outline-1 outline-primary"
                        : "border-border hover:border-primary/50 hover:bg-muted/50",
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-8 h-8",
                        field.value === option.value
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    />

                    <span className="text-sm font-medium">{option.label}</span>
                  </motion.div>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
