"use client";

import * as React from "react";
import { Phone, MessageSquare, UserPlus, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export interface InterventionActionsProps {
  callId?: string;
  onIntervene?: (action: InterventionAction) => void;
  className?: string;
}

export type InterventionAction =
  | { type: "listen"; notes?: string }
  | { type: "whisper"; message: string }
  | { type: "barge"; notes?: string }
  | { type: "transfer"; target: string; notes?: string };

export function InterventionActions({
  callId,
  onIntervene,
  className,
}: InterventionActionsProps) {
  const [selectedAction, setSelectedAction] = React.useState<string | null>(
    null,
  );
  const [notes, setNotes] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [target, setTarget] = React.useState("");

  const handleAction = (actionType: string) => {
    if (!callId) return;

    let action: InterventionAction;
    switch (actionType) {
      case "listen":
        action = { type: "listen", notes };
        break;
      case "whisper":
        action = { type: "whisper", message };
        break;
      case "barge":
        action = { type: "barge", notes };
        break;
      case "transfer":
        action = { type: "transfer", target, notes };
        break;
      default:
        return;
    }

    onIntervene?.(action);
    setSelectedAction(null);
    setNotes("");
    setMessage("");
    setTarget("");
  };

  const actions = [
    {
      id: "listen",
      label: "Listen In",
      description: "Monitor the call without being heard",
      icon: Phone,
      color: "text-blue-600",
    },
    {
      id: "whisper",
      label: "Whisper",
      description: "Send a private message to the agent",
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      id: "barge",
      label: "Barge In",
      description: "Join the call and speak to both parties",
      icon: UserPlus,
      color: "text-amber-600",
    },
    {
      id: "transfer",
      label: "Transfer",
      description: "Transfer the call to another agent",
      icon: AlertCircle,
      color: "text-red-600",
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Intervention Actions</CardTitle>
        <CardDescription>Take action on active calls</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {actions.map((action) => (
            <Dialog key={action.id}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="h-auto flex-col items-start p-4"
                  onClick={() => setSelectedAction(action.id)}
                >
                  <div className="flex items-center gap-2 w-full mb-2">
                    <action.icon className={`h-5 w-5 ${action.color}`} />
                    <span className="font-medium">{action.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left w-full whitespace-normal">
                    {action.description}
                  </p>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{action.label}</DialogTitle>
                  <DialogDescription>{action.description}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {action.id === "whisper" && (
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Enter message for agent..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                  )}
                  {action.id === "transfer" && (
                    <div className="space-y-2">
                      <Label htmlFor="target">Transfer To</Label>
                      <Textarea
                        id="target"
                        placeholder="Enter agent name or ID..."
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                      />
                    </div>
                  )}
                  {(action.id === "listen" ||
                    action.id === "barge" ||
                    action.id === "transfer") && (
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes (optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Add notes about this intervention..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedAction(null);
                      setNotes("");
                      setMessage("");
                      setTarget("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => handleAction(action.id)}>
                    Confirm {action.label}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
