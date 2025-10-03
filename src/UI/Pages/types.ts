import { z } from "zod";

export const CustomPayloadSchema = z.record(z.string(), z.any()).nullable();

export const SocialProofSchema = z.object({
  numberOfStar: z.number(),
  content: z.string(),
  authorName: z.string(),
});
