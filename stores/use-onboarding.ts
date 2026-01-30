import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OrganizationSetup {
    organizationName: string;
    industry: string;
    size: string;
    timezone: string;
    language: string;
    contactEmail: string;
    contactPhone: string;
}

interface OnboardingState {
    currentStep: number;
    completedSteps: number[];
    organizationSetup: OrganizationSetup | null;
    isOnboardingComplete: boolean;
    setCurrentStep: (step: number) => void;
    markStepComplete: (step: number) => void;
    setOrganizationSetup: (setup: OrganizationSetup) => void;
    updateOrganizationSetup: (setup: Partial<OrganizationSetup>) => void;
    completeOnboarding: () => void;
    resetOnboarding: () => void;
}

const initialOrganizationSetup: OrganizationSetup = {
    organizationName: '',
    industry: '',
    size: '',
    timezone: '',
    language: '',
    contactEmail: '',
    contactPhone: '',
};

export const useOnboarding = create<OnboardingState>()(
    persist(
        (set, get) => ({
            currentStep: 0,
            completedSteps: [],
            organizationSetup: null,
            isOnboardingComplete: false,
            setCurrentStep: (step) => set({ currentStep: step }),
            markStepComplete: (step) =>
                set((state) => ({
                    completedSteps: state.completedSteps.includes(step)
                        ? state.completedSteps
                        : [...state.completedSteps, step],
                })),
            setOrganizationSetup: (setup) => set({ organizationSetup: setup }),
            updateOrganizationSetup: (setup) =>
                set((state) => ({
                    organizationSetup: {
                        ...(state.organizationSetup || initialOrganizationSetup),
                        ...setup,
                    },
                })),
            completeOnboarding: () => set({ isOnboardingComplete: true }),
            resetOnboarding: () =>
                set({
                    currentStep: 0,
                    completedSteps: [],
                    organizationSetup: null,
                    isOnboardingComplete: false,
                }),
        }),
        {
            name: 'onboarding-storage',
        }
    )
);
