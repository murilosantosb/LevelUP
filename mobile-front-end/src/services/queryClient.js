import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query'
import { deleteToken } from './tokenStorage'

async function handleError(error) {
  if (error?.response?.status === 401) {
    await deleteToken()
    await queryClient.cancelQueries()
    queryClient.removeQueries({ predicate: (query) => query.queryKey[0] !== 'session' })
    queryClient.setQueryData(['session'], null)
  }
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleError }),
  mutationCache: new MutationCache({ onError: handleError }),
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: (count, error) => count < 1 && (!error.response || error.response.status >= 500),
    },
    mutations: { retry: false },
  },
})
