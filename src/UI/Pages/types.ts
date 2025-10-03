import { z } from "zod";

export const CustomPayloadSchema = z.record(z.string(), z.any()).nullable();
