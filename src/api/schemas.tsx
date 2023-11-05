import {z} from 'zod';

export const liquidsSchema = z
  .object({
    id: z.number(),
    name: z.string().optional().nullable(),
    quantity: z.number().optional().nullable(),
    timestamp: z.date().optional().nullable(),
  })
  .array();
