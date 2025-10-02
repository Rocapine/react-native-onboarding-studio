import { GetStepsParams, GetStepsResponse } from "./types";

type OnboardingStudioClientOptions = {
  baseUrl?: string;
  isSanbdox?: boolean;
};

export class OnboardingStudioClient {
  private baseUrl: string;
  private projectId: string;
  private options: OnboardingStudioClientOptions;

  constructor(projectId: string, options: OnboardingStudioClientOptions) {
    console.info("OnboardingStudioClient constructor", options.baseUrl);
    this.projectId = projectId;
    this.options = options;
    this.baseUrl =
      options.baseUrl ||
      "https://takbcvjljqialzqyksic.supabase.co/functions/v1";
  }

  async getSteps(params: GetStepsParams): Promise<GetStepsResponse> {
    console.info("OnboardingStudioClient getSteps", params);
    const isSandbox = this.options.isSanbdox;
    const url = `${this.baseUrl}/get-onboarding-steps?projectId=${this.projectId}?draft=${isSandbox}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch onboarding steps: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  }
}
