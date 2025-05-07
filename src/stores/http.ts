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

      if (!res.ok) {
        throw new Error(await res.text())
      }

      if (res.status === 204) {
        return {} as T // Return an empty object casted to T
      }

      return res.json() as Promise<T>
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
    async form<T = any> (url: string, body?: any, options: RequestInit = {}): Promise<T> {
      return this.fetch<T>(url, {
        method: 'POST',
        body,
        ...options,
      })
    },
    async get<T = any> (url: string, options: RequestInit = {}): Promise<T> {
      return this.fetch<T>(url, options)
    },
    async delete (url: string, options: RequestInit = {}): Promise<Response> {
      return this.fetch<Response>(url, {
        method: 'DELETE',
        ...options,
      })
    },
  },
})
