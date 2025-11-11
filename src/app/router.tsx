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
                        Component: (await import('@src/pages/HomePage/HomePage.tsx')).default,
                        handle: { route: routes.home },
                    }
                },
            },
            {
                path: routes.notes.url(),
                lazy: async () => {
                    const { NotesPage } = await import('@src/pages/NotesPage/NotesPage.tsx')
                    const { ProtectedRoute } = await import('@src/app/guards/ProtectedRoute.tsx')

                    return {
                        Component: () => (
                            <ProtectedRoute>
                                <NotesPage />
                            </ProtectedRoute>
                        ),
                        handle: { route: routes.notes },
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
