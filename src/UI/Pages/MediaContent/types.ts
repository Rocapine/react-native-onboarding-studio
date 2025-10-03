import { z } from "zod";
import { CustomPayloadSchema, SocialProofSchema } from "../types";

export const MediaSourceSchema = z.union([
  z.object({
    type: z.literal("image").or(z.literal("lottie")).or(z.literal("rive")),
    localPathId: z.string(),
  }),
  z.object({
    type: z.literal("image").or(z.literal("lottie")).or(z.literal("rive")),
    url: z.string(),
  }),
]);

export const MediaContentStepPayloadSchema = z.object({
  mediaSource: MediaSourceSchema,
  title: z.string(),
  description: z.string().nullable(),
  socialProof: SocialProofSchema.nullable(),
});

export const MediaContentStepTypeSchema = z.object({
  id: z.string(),
  type: z.literal("MediaContent"),
  name: z.string(),
  displayProgressHeader: z.boolean(),
  payload: MediaContentStepPayloadSchema,
  customPayload: CustomPayloadSchema,
  figmaUrl: z.string().nullable(),
});

export type MediaContentStepType = z.infer<typeof MediaContentStepTypeSchema>;
