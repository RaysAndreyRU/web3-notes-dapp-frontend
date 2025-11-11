export const API_ROUTES = {
    notes: {
        list: '/api/notes',
        get: (id: number | string) => `/api/notes/${id}`,
        create: '/api/notes',
        update: (id: number | string) => `/api/notes/${id}`,
        delete: (id: number | string) => `/api/notes/${id}`,
    },

    auth: {
        verifySession: '/api/auth/verify-session',
    },
}


export const QUERY_KEYS = {
    notes: {
        list: 'GET:/api/notes',
        get: 'GET:/api/notes/:id',
        create: 'POST:/api/notes',
        update: 'PUT:/api/notes/:id',
        delete: 'DELETE:/api/notes/:id',
    },
}
