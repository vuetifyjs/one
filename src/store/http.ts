import { defineStore } from 'pinia'

export const useHttpStore = defineStore('http', {
  state: () => ({
    url: '',
  }),
  actions: {
    async fetch<T = any> (url: string, options: RequestInit = {}): Promise<T> {
      const res = await fetch(`${this.url}${url}`, {
        credentials: 'include',
        ...options,
      })

      return res.status === 204 ? res : res.json()
    },
    async post<T = any> (url: string, body?: any, options: RequestInit = {}): Promise<T> {
      return this.fetch<T>(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        ...options,
      })
    },
    async get<T = any> (url: string, options: RequestInit = {}): Promise<T> {
      return this.fetch<T>(url, options)
    },
  },
})
