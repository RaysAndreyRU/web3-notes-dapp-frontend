import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@src/shared/constants/queryClient'

import { App } from './App'

/**
 * The application entry point
 * Wrapps the main App in providers
 */
export const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}
