"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Users, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const ROLE_OPTIONS = [
  { value: "manager", label: "Manager" },
  { value: "agent", label: "Agent" },
];

export function StepTeam() {
  const form = useFormContext();
  const { toast } = useToast();
  const [isInvited, setIsInvited] = useState(false);

  const email = form.watch("inviteEmail");
  const role = form.watch("inviteRole");

  const handleInvite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email || !role) return;

    // Simulate invite
    console.log(`Inviting ${email} as ${role}`);
    setIsInvited(true);
    toast({
      title: "Invitation Sent",
      description: `Invited ${email} as ${role}`,
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Grow your team</h2>
        <p className="text-muted-foreground mt-2">
          Invite your first team member to collaborate.
        </p>
      </div>

      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
          <Users className="w-8 h-8" />
        </div>

        <div className="w-full space-y-4 text-left">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,150px] gap-4 items-end">
            <FormField
              control={form.control}
              name="inviteEmail"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Team Member Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="colleague@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inviteRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ROLE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className="w-full"
            variant={isInvited ? "outline" : "default"}
            disabled={!email || !role || isInvited}
            onClick={handleInvite}
          >
            {isInvited ? (
              <>Invitation Sent</>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Send Invitation
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
