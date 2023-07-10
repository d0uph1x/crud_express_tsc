import * as z from 'zod';

export const paramsWithId = z.object({
    id: z.string().min(1)
})

export type paramsWithId = z.infer<typeof paramsWithId>;