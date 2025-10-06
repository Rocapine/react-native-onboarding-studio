import { z } from "zod";
import { CustomPayloadSchema } from "../types";

// CarouselStepType
export const CarouselScreenSchema = z.object({
  mediaUrl: z.string(),
  title: z.string(),
  subtitle: z.string(),
});

export const CarouselStepPayloadSchema = z.object({
  screens: z.array(CarouselScreenSchema),
});

export const CarouselStepTypeSchema = z.object({
  id: z.string(),
  type: z.literal("Carousel"),
  name: z.string(),
  displayProgressHeader: z.boolean(),
  payload: CarouselStepPayloadSchema,
  customPayload: CustomPayloadSchema,
  figmaUrl: z.string().nullable(),
});

export type CarouselStepType = z.infer<typeof CarouselStepTypeSchema>;
