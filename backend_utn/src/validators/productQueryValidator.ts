import { z } from "zod";

export const productQuerySchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  stock: z.coerce.number().int().min(0).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional()
});
