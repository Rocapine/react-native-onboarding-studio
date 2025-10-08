import { createContext, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../Theme/ThemeProvider";
import { ColorScheme } from "../Theme/types";

export const OnboardingProgressProvider = ({
  children,
  initialColorScheme = "light",
}: {
  children: React.ReactNode;
  initialColorScheme?: ColorScheme;
}) => {
  const [activeStep, setActiveStep] = useState({
    number: 0,
    displayProgressHeader: false,
  });
  const [totalSteps, setTotalSteps] = useState(0);

  return (
    <SafeAreaProvider>
      <ThemeProvider initialColorScheme={initialColorScheme}>
        <OnboardingProgressContext.Provider
          value={{ activeStep, setActiveStep, totalSteps, setTotalSteps }}
        >
          {children}
        </OnboardingProgressContext.Provider>
      </ThemeProvider>
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
