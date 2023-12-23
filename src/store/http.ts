import { defineStore } from 'pinia'

export const useHttpStore = defineStore('http', {
  state: () => ({
    url: '',
  }),
  actions: {
    async fetch (url: string, options: RequestInit = {}) {
      const res = await fetch(`${this.url}${url}`, {
        credentials: 'include',
        ...options,
      })

      return res.json()
    },
    async post (url: string, body?: any, options: RequestInit = {}) {
      const res = await this.fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        ...options,
      })

      return res.json()
    },
    async get (url: string, options: RequestInit = {}) {
      const res = await this.fetch(url, options)

      return res.json()
    },
  },
})
