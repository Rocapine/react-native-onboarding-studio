import { z } from "zod";
import { CustomPayloadSchema } from "../types";

export const LoaderStepPayloadSchema = z.any();

export const LoaderStepTypeSchema = z.object({
  id: z.string(),
  type: z.literal("Loader"),
  name: z.string(),
  displayProgressHeader: z.boolean(),
  payload: LoaderStepPayloadSchema,
  customPayload: CustomPayloadSchema,
  figmaUrl: z.string().nullable(),
});

export type LoaderStepType = z.infer<typeof LoaderStepTypeSchema>;
