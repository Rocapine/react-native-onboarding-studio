import { OnboardingStepType } from "./UI/types";

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
  steps: OnboardingStepType[];
  configuration: any;
}

export interface GetStepsResponseHeaders {
  "ONBS-Onboarding-Id": string | null;
  "ONBS-Audience-Id": string | null;
  "ONBS-Onboarding-Name": string | null;
}
