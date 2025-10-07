import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  OnboardingProgressProvider,
  ProgressBar,
} from "@rocapine/react-native-onboarding-studio";

const queryClient = new QueryClient();

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <OnboardingProgressProvider>
        <ProgressBar />
        {children}
      </OnboardingProgressProvider>
    </QueryClientProvider>
  );
};
