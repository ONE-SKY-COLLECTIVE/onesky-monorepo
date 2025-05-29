// import { createTRPCReact } from '@trpc/react-query';
// import { httpBatchLink } from '@trpc/client';
// import { AppRouter } from '../../../packages/trpc';

// export const trpc = createTRPCReact<AppRouter>();

// export const trpcClient = trpc.createClient({
//   links: [
//     httpBatchLink({
//       url: 'http://192.168.100.160:3000/api/trpc',
//     }),
//   ],
// });

// utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from '../../../packages/trpc/';

export const trpc = createTRPCReact<AppRouter>();
