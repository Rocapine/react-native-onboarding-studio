import { z } from "zod";
import { CustomPayloadSchema, InfoBoxSchema } from "../types";

export const AnswerSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.string().nullable(),
  description: z.string().nullable(),
});

export const QuestionStepPayloadSchema = z.object({
  answers: z.array(AnswerSchema),
  title: z.string(),
  subtitle: z.string().nullable(),
  multipleAnswer: z.boolean(),
  infoBox: InfoBoxSchema.nullable(),
});

export const QuestionStepTypeSchema = z.object({
  id: z.string(),
  type: z.literal("Question"),
  name: z.string(),
  displayProgressHeader: z.boolean(),
  payload: QuestionStepPayloadSchema,
  customPayload: CustomPayloadSchema,
  figmaUrl: z.string().nullable(),
});

export type QuestionStepType = z.infer<typeof QuestionStepTypeSchema>;
