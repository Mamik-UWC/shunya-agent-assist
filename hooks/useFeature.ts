import { useFeatureFlagsStore } from "@/stores/feature-flags.store";

export function useFeature(feature: string): boolean {
  const flags = useFeatureFlagsStore((state) => state.flags);
  return flags[feature] ?? false;
}
