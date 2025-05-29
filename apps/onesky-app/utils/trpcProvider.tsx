// utils/trpcProvider.tsx
'use client';

import React from 'react';
import { httpBatchLink } from '@trpc/client';
import { QueryClient } from '@tanstack/react-query';
import { trpc } from './trpc'; // <- YOUR createTRPCReact<AppRouter>()

export function TRPCProvider({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) {
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: 'http://192.168.100.160:3000/api/trpc', // Replace with LAN IP if needed
      }),
    ],
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  );
}
