import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  mediaId: z.string().optional(),
});
