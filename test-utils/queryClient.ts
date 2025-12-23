import { QueryClient } from "@tanstack/react-query";

// Create a shared query client for testing
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      retry: false,
    },
    mutations: {
      gcTime: Infinity,
      retry: false,
    },
  },
});

// Reset the query client
export const resetQueryClient = () => queryClient.clear();
