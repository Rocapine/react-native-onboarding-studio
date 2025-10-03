import z from "zod";
import { SocialProofSchema } from "../types";

export const RatingsSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  socialProofs: z.array(SocialProofSchema),
});

export type RatingsStep = z.infer<typeof RatingsSchema>;
