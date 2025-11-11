import type { AxiosRequestConfig } from 'axios'

import { createClient } from './client.ts'

const { instance } = createClient()

const request =
  (method: string) =>
  async (endpoint: string, data: unknown, options: AxiosRequestConfig = {}) => {
    let response
    try {
      if (options.requestSchema) {
        data = options.requestSchema.parse(data)
      }

      response = await instance.request({
        method,
        url: endpoint,
        ...(method.toUpperCase() === 'GET' ? { params: data } : { data }),
        ...options,
      })
    } catch (error) {
      throw error
    }

    return response.data
  }

const apiClient = {
  get: request('GET'),
  post: request('POST'),
  patch: request('PATCH'),
  put: request('PUT'),
  delete: request('DELETE'),
  head: request('HEAD'),
  options: request('OPTIONS'),
}

export { apiClient }
