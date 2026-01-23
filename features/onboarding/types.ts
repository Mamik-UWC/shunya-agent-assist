export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface OnboardingConfig {
  steps: OnboardingStep[];
}
