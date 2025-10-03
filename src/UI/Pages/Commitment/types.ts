import { z } from "zod";
import { CustomPayloadSchema } from "../types";

export const CommitmentStepPayloadSchema = z.any();

export const CommitmentStepTypeSchema = z.object({
  id: z.string(),
  type: z.literal("Commitment"),
  name: z.string(),
  displayProgressHeader: z.boolean(),
  payload: CommitmentStepPayloadSchema,
  customPayload: CustomPayloadSchema,
  figmaUrl: z.string().nullable(),
});

export type CommitmentStepType = z.infer<typeof CommitmentStepTypeSchema>;
