import z from "zod";
import { CustomPayloadSchema, SocialProofSchema } from "../types";

export const RatingsStepPayloadSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  socialProofs: z.array(SocialProofSchema),
});

export const RatingsStepTypeSchema = z.object({
  id: z.string(),
  type: z.literal("Ratings"),
  name: z.string(),
  displayProgressHeader: z.boolean(),
  payload: RatingsStepPayloadSchema,
  customPayload: CustomPayloadSchema,
  figmaUrl: z.string().nullable(),
});

export type RatingsStep = z.infer<typeof RatingsStepTypeSchema>;
