import axios, { HttpStatusCode, type AxiosInstance } from 'axios'
import config from './config.ts'

export const createClient = () => {
    const instance: AxiosInstance = axios.create({
        baseURL: config.url,
        withCredentials: false,
    })

    const clearAuthentication = () => {
        localStorage.clear()
    }
    instance.interceptors.request.use((config) => {
        const stored = localStorage.getItem('lumia-passport-jwt-tokens')

        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                const token = parsed?.accessToken
                if (token) {
                    config.headers = config.headers || {}
                    ;(config.headers as any).common = {
                        ...(config.headers as any).common,
                        Authorization: `Bearer ${token}`,
                    }
                }
            } catch {
                console.warn('Invalid Lumia Passport data in localStorage')
            }
        }

        return config
    })
    instance.interceptors.response.use(
        (response) => {
            const { model, modelDictionary, flattenDictionary } = response.config

            if (model) {
                const rawData =
                    'data' in response.data ? response.data.data : response.data

                let dataForValidation: unknown = rawData

                if (flattenDictionary && !Array.isArray(rawData)) {
                    dataForValidation = Object.values(rawData).flat()
                }

                if (modelDictionary && !flattenDictionary) {
                    const result: Record<string, unknown> = {}
                    for (const key in rawData) {
                        if (Object.prototype.hasOwnProperty.call(rawData, key)) {
                            const value = rawData[key as keyof typeof rawData]
                            result[key] = model.parse(value)
                        }
                    }
                    response.data = result
                } else {
                    response.data = model.parse(dataForValidation)
                }
            }

            return response
        },
        (error) => {
            if (error.response?.status === HttpStatusCode.Unauthorized) {
                clearAuthentication()
            }
            return Promise.reject(error)
        },
    )

    return { instance }
}
