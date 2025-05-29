import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

export const greetingsRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name ?? 'World'}!`,
        timestamp: new Date().toISOString(),
      };
    }),
}); 