export interface GetStepsParams {
  projectId: string;
  paywallVariant?: string;
  appEnv?: string;
  locale?: string;
  platform?: string;
  appVersion?: string;
}

export interface OnboardingStep {
  id: string;
  [key: string]: any;
}

export interface GetStepsResponse {
  steps: OnboardingStep[];
}