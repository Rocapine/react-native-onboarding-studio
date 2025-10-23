import { OnboardingStepType } from "./UI/types";

export type OnboardingStudioClientOptions = {
  appVersion?: string;
  isSandbox?: boolean;
  baseUrl?: string;
  fallbackOnboarding?: Onboarding<OnboardingStepType>;
};

export type OnboardingOptions = {
  locale?: string;
};

export type UserDefinedParams = {
  [key: string]: string;
};

export interface OnboardingMetadata {
  id: string;
  name?: string;
  audienceId?: string;
  audienceName?: string;
  audienceOrder?: number;
  locale?: string;
  draft?: boolean;
}

export interface Onboarding<
  StepType extends OnboardingStepType = OnboardingStepType
> {
  metadata: OnboardingMetadata;
  steps: StepType[];
  configuration: any;
}

export interface GetStepsResponseHeaders {
  "ONBS-Onboarding-Id": string | null;
  "ONBS-Audience-Id": string | null;
  "ONBS-Onboarding-Name": string | null;
}
