import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './router';

const server = createHTTPServer({
  router: appRouter,
});

const port = Number(process.env.PORT) || 3001;
server.listen(port);

console.log(`🚀 Server listening on port ${port}`); 