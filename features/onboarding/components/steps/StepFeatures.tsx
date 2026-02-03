"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { mockAvailableWidgets } from "@/features/dashboards/data/mock-widgets";
import { motion } from "motion/react";

export function StepFeatures() {
  const form = useFormContext();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Customize your workspace
        </h2>
        <p className="text-muted-foreground mt-2">
          Select the features you want to enable for your team.
        </p>
      </div>

      <FormField
        control={form.control}
        name="features"
        render={() => (
          <FormItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockAvailableWidgets.map((widget, index) => (
                <FormField
                  key={widget.id}
                  control={form.control}
                  name="features"
                  render={({ field }) => {
                    const isChecked = field.value?.includes(widget.id);
                    return (
                      <FormItem key={widget.id} className="space-y-0">
                        <FormControl>
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            onClick={() => {
                              if (isChecked) {
                                field.onChange(
                                  field.value?.filter(
                                    (v: string) => v !== widget.id,
                                  ),
                                );
                              } else {
                                field.onChange([
                                  ...(field.value || []),
                                  widget.id,
                                ]);
                              }
                            }}
                            className={`
                              cursor-pointer flex flex-row items-center justify-between rounded-xl border p-5 transition-all
                              ${
                                isChecked
                                  ? "outline-offset-4 outline-1 outline-primary"
                                  : "border-border hover:border-primary/50 hover:bg-muted/30"
                              }
                            `}
                          >
                            <div className="space-y-0.5 mr-4">
                              <FormLabel className="text-base font-semibold cursor-pointer">
                                {widget.name}
                              </FormLabel>
                              <p className="text-sm text-muted-foreground">
                                {widget.description}
                              </p>
                            </div>
                            {/* Switch removed as per requirement, visual selection via card style */}
                          </motion.div>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
