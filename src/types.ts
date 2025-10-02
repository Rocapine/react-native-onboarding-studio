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

export interface OnboardingStepMetadata {
  id: string;
  name?: string;
  audienceId?: string;
  audienceName?: string;
  audienceOrder?: number;
  locale?: string;
  draft?: boolean;
}

export interface GetStepsResponse {
  metadata: OnboardingStepMetadata;
  steps: OnboardingStep[];
  configuration: any;
}

export interface GetStepsResponseHeaders {
  "ONBS-Onboarding-Id": string | null;
  "ONBS-Audience-Id": string | null;
  "ONBS-Onboarding-Name": string | null;
}
