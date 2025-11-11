export type Routes = 'home' | 'notes'

export type IRoute = {
    /** Translation key for the route title (document title) */
    titleKey: string
    /** URL for the route */
    url: () => string
}

export const routes: Record<Routes, IRoute> = {
    home: {
        titleKey: 'Home',
        url: () => '/',
    },

    notes: {
        titleKey: 'Notes',
        url: () => '/notes',
    },
}
