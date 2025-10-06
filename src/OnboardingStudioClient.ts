import {
  GetStepsResponse,
  GetStepsResponseHeaders,
  OnboardingOptions,
  OnboardingStudioClientOptions,
  UserDefinedParams,
} from "./types";

import { Platform } from "react-native";

export class OnboardingStudioClient {
  private baseUrl: string;
  public projectId: string;
  public options: OnboardingStudioClientOptions;

  constructor(projectId: string, options: OnboardingStudioClientOptions) {
    console.info("OnboardingStudioClient init: projectId ", projectId);
    this.projectId = projectId;
    this.options = options;
    this.baseUrl =
      options.baseUrl ||
      "https://takbcvjljqialzqyksic.supabase.co/functions/v1";
  }

  async getSteps(
    onboardingOptions?: OnboardingOptions,
    userDefinedParams?: UserDefinedParams
  ): Promise<{ data: GetStepsResponse; headers: GetStepsResponseHeaders }> {
    console.info("OnboardingStudioClient getSteps");
    const isSandbox = this.options.isSanbdox;

    const urlParams = new URLSearchParams();
    // Add userDefinedParams to URL
    if (userDefinedParams) {
      Object.entries(userDefinedParams).forEach(([key, value]) => {
        urlParams.append(key, value);
      });
    }

    urlParams.append("projectId", this.projectId);
    urlParams.append("platform", Platform.OS);

    const appVersion = this.options.appVersion; // TODO get the version from the expo app
    if (appVersion) {
      urlParams.append("appVersion", appVersion);
    }

    if (isSandbox) {
      urlParams.append("draft", "true");
    }

    // Add onboardingOptions to URL
    if (onboardingOptions?.locale) {
      urlParams.append("locale", onboardingOptions.locale);
    }

    const url = `${this.baseUrl}/get-onboarding-steps?${urlParams.toString()}`;
    console.info("OnboardingStudioClient getSteps url", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch onboarding steps: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return {
      data,
      headers: {
        "ONBS-Onboarding-Id": response.headers.get("ONBS-Onboarding-Id"),
        "ONBS-Audience-Id": response.headers.get("ONBS-Audience-Id"),
        "ONBS-Onboarding-Name": response.headers.get("ONBS-Onboarding-Name"),
      },
    };
  }
}
