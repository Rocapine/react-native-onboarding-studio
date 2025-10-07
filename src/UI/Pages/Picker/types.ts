import { z } from "zod";
import { CustomPayloadSchema } from "../types";

export const PickerTypeEnum = z.enum([
  "height",
  "weight",
  "age",
  "gender",
  "coach",
  "name",
]);

export const PickerStepPayloadSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  pickerType: z.union([PickerTypeEnum, z.string()]),
});

export const PickerStepTypeSchema = z.object({
  id: z.string(),
  type: z.literal("Picker"),
  name: z.string(),
  displayProgressHeader: z.boolean(),
  payload: PickerStepPayloadSchema,
  customPayload: CustomPayloadSchema,
  continueButtonLabel: z.string().optional().default("Continue"),
  figmaUrl: z.string().nullable(),
});

export type PickerStepType = z.infer<typeof PickerStepTypeSchema>;

export type WeightUnit = "kg" | "lb";
