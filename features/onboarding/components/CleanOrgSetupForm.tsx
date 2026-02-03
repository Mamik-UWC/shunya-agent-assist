"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CleanOnboardingLayout } from "./CleanOnboardingLayout";
import { StepBasicInfo } from "./steps/StepBasicInfo";
import { StepIndustry } from "./steps/StepIndustry";
import { StepFeatures } from "./steps/StepFeatures";
import { StepTeam } from "./steps/StepTeam";
import { StepTelephony } from "./steps/StepTelephony";
import { StepDocuments } from "./steps/StepDocuments";
import { Form } from "@/components/ui/form";

import { motion, AnimatePresence } from "motion/react";
import { useToast } from "@/hooks/use-toast";

// Schema
const formSchema = z.object({
  // Step 1: Basic Info
  companyName: z.string().min(2, "Company name is required"),
  regions: z.array(z.string()).min(1, "Select at least one region"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and privacy policy",
  }),

  // Step 2: Industry
  industry: z.string().min(1, "Industry is required"),

  // Step 3: Features
  features: z.array(z.string()).optional(),

  // Step 4: Team
  inviteEmail: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  inviteRole: z.string().optional(),

  // Step 5: Telephony
  telephonyProvider: z.string().optional(),
  apiKey: z.string().optional(),

  // Step 6: Documents
  documentCategory: z.string().optional(),
  documents: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
  { id: "basic-info", component: StepBasicInfo },
  { id: "industry", component: StepIndustry },
  { id: "features", component: StepFeatures },
  { id: "team", component: StepTeam },
  { id: "telephony", component: StepTelephony },
  { id: "documents", component: StepDocuments },
];

export function CleanOrgSetupForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      regions: [],
      languages: [],
      agreeToTerms: false,
      industry: "",
      features: [],
      inviteEmail: "",
      inviteRole: "agent",
      telephonyProvider: "",
      apiKey: "",
      documentCategory: "",
    },
    mode: "onChange",
  });

  const nextStep = async () => {
    // Determine fields to validate based on current step
    let fieldsToValidate: any[] = [];

    switch (currentStep) {
      case 0: // Basic Info
        fieldsToValidate = [
          "companyName",
          "regions",
          "languages",
          "agreeToTerms",
        ];
        break;
      case 1: // Industry
        fieldsToValidate = ["industry"];
        break;
      // Other steps might not have strict requirements to proceed, or are optional
      case 3: // Team (invite is handled inline or optional)
        // If data is entered but not invited, we might want to validate?
        // But schema allows optional/empty.
        // Let's validate just in case user typed partial email
        fieldsToValidate = ["inviteEmail"];
        break;
    }

    // Trigger validation
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // Final submit
        form.handleSubmit(onSubmit)();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const skipStep = () => {
    // Logic for skip: usually just go next without validation or clearing optional fields?
    // For now, just next. Validation might block if fields are required though.
    // Steps 1 & 2 are required, so skip shouldn't be valid there.
    // Steps 3, 4, 5, 6 seem skippable (optional fields).
    if (currentStep < 2) return; // Cannot skip required steps

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log("Clean Onboarding Submitted:", data);
    toast({
      title: "Setup Complete",
      description: "Your organization has been successfully configured.",
    });
    // Redirect or show success
  };

  const CurrentComponent = STEPS[currentStep].component;

  // Determine if Skip button should be shown
  const showSkip = currentStep >= 2; // Steps 3, 4, 5, 6 are skippable

  return (
    <Form {...form}>
      <CleanOnboardingLayout
        currentStep={currentStep}
        totalSteps={STEPS.length}
        onBack={currentStep > 0 ? prevStep : undefined}
        onSkip={showSkip ? skipStep : undefined}
        onNext={nextStep}
        nextLabel={currentStep === STEPS.length - 1 ? "Complete Setup" : "Next"}
        isNextLoading={form.formState.isSubmitting}
        showBack={currentStep > 0}
      >
        <div className="w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <CurrentComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </CleanOnboardingLayout>
    </Form>
  );
}
