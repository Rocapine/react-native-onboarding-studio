import { createContext, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const OnboardingProgressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeStep, setActiveStep] = useState({
    number: 0,
    displayProgressHeader: false,
  });
  const [totalSteps, setTotalSteps] = useState(0);

  return (
    <SafeAreaProvider>
      <OnboardingProgressContext.Provider
        value={{ activeStep, setActiveStep, totalSteps, setTotalSteps }}
      >
        {children}
      </OnboardingProgressContext.Provider>
    </SafeAreaProvider>
  );
};

export const OnboardingProgressContext = createContext({
  activeStep: { number: 0, displayProgressHeader: false },
  setActiveStep: (step: {
    number: number;
    displayProgressHeader: boolean;
  }) => {},
  totalSteps: 0,
  setTotalSteps: (steps: number) => {},
});
