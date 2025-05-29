import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import {db} from "../server/src/index"
import {users} from "../server/src/db/schema"
const t = initTRPC.create();

export const appRouter = t.router({
  sayHello: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello, ${input.name}!` };
    }),
    createUser: t.procedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(6),
    }))
    .mutation(async ({ input }) => {
      console.log(input)
      await db.insert(users).values(input);
      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;
