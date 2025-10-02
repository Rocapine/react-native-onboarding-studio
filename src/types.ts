export type OnboardingStudioClientOptions = {
  appVersion?: string;
  isSanbdox?: boolean;
  baseUrl?: string;
};

export type OnboardingOptions = {
  locale?: string;
};

export type UserDefinedParams = {
  [key: string]: string;
};

export interface OnboardingStep {
  id: string;
  [key: string]: any;
}

export interface GetStepsResponse {
  steps: OnboardingStep[];
}
