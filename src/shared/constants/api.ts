export const API_ROUTES = {
  users: {
    list: '/v1/users',
    get: (id: number) => `/v1/users/${id}`,
  },
}

export const QUERY_KEYS = {
  users: {
    list: 'GET:/v1/users',
    get: 'GET:/v1/users/:id',
  },
}
