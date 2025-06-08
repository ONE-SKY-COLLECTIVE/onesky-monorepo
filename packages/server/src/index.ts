import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { router } from './trpc';
import { usersRouter } from './router/users';

const appRouter = router({
  users: usersRouter,
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

const port = process.env.PORT || 3001;
server.listen(port);

console.log(`🚀 Server listening on port ${port}`);
