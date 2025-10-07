import { z } from "zod";
import { CustomPayloadSchema, MediaSourceSchema } from "../types";

export const LoaderStepSchema = z.object({
  label: z.string(),
  completed: z.string(),
});

export const LoaderStepPayloadSchema = z.object({
  title: z.string(),
  steps: z.array(LoaderStepSchema),
  didYouKnowImages: z.array(MediaSourceSchema).optional(),
  duration: z.number().optional().default(2000),
});

export const LoaderStepTypeSchema = z.object({
  id: z.string(),
  type: z.literal("Loader"),
  name: z.string(),
  displayProgressHeader: z.boolean(),
  payload: LoaderStepPayloadSchema,
  customPayload: CustomPayloadSchema,
  continueButtonLabel: z.string().optional().default("Continue"),
  figmaUrl: z.string().nullable(),
});

export type LoaderStepType = z.infer<typeof LoaderStepTypeSchema>;
export type LoaderStep = z.infer<typeof LoaderStepSchema>;
