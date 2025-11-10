import { createBrowserRouter } from 'react-router-dom'

import { routes } from './constants/routes'

import { BaseLayout } from './layouts/BaseLayout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { HydrateFallback } from './components/HydrateFallback'
import { RouteHandler } from './components/RouteHandler'
import { UnknownRoute } from './components/UnknownRoute'

export const router = createBrowserRouter([
  {
    path: routes.home.url(),
    element: (
      <RouteHandler>
        <BaseLayout />
      </RouteHandler>
    ),
    errorElement: <ErrorBoundary />,
    hydrateFallbackElement: <HydrateFallback />,
    children: [
      {
        index: true,
        lazy: async () => {
          return {
            Component: await import('@src/pages/HomePage').then((m) => m.default),
            handle: { route: routes.home },
          }
        },
      },
      {
        path: '*',
        element: <UnknownRoute />,
      },
    ],
  },
])
