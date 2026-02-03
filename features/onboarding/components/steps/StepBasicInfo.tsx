"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Switch } from "@/components/ui/switch";

const REGION_OPTIONS = [
  { value: "na", label: "North America" },
  { value: "eu", label: "Europe" },
  { value: "apac", label: "Asia Pacific" },
  { value: "latam", label: "Latin America" },
];

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
];

export function StepBasicInfo() {
  const form = useFormContext();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Welcome to Shunya</h2>
        <p className="text-muted-foreground mt-2">
          Let&apos;s get your workspace set up.
        </p>
      </div>

      <div className="space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="regions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Regions</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={REGION_OPTIONS}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select regions..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Languages</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={LANGUAGE_OPTIONS}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select languages..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-4 rounded-lg border p-4">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Terms & Privacy Policy
                </FormLabel>
                <FormDescription>
                  You agree to our terms of service and privacy policy.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        {form.formState.errors.agreeToTerms && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.agreeToTerms.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
