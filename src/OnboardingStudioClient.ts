import { GetStepsParams, GetStepsResponse } from "./types";

export class OnboardingStudioClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    console.info("OnboardingStudioClient constructor", baseUrl);
    this.baseUrl =
      baseUrl || "https://takbcvjljqialzqyksic.supabase.co/functions/v1";
  }

  async getSteps(params: GetStepsParams): Promise<GetStepsResponse> {
    console.info("OnboardingStudioClient getSteps", params);
    const { projectId } = params;
    const url = `${this.baseUrl}/get-onboarding-steps?projectId=${projectId}`;
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
