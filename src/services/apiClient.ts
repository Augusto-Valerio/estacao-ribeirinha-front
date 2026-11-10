type ApiErrorPayload = {
  erro?: string
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  if (!apiBaseUrl) {
    throw new ApiError('A URL da API não foi configurada.', 0)
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as ApiErrorPayload | null
    const message = payload?.erro ?? `A API respondeu com o status ${response.status}.`

    throw new ApiError(message, response.status)
  }

  return (await response.json()) as T
}
