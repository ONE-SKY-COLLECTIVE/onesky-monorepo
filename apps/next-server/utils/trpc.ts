import { createTRPCReact } from '@trpc/react-query';
import { type AppRouter } from '@onesky/server/src/router';

export const trpc = createTRPCReact<AppRouter>(); 