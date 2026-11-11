type ApiErrorPayload = {
  erro?: string
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')

type MutationMethod = 'POST' | 'PUT' | 'DELETE'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request(path: string, init: RequestInit) {
  if (!apiBaseUrl) {
    throw new ApiError('A URL da API não foi configurada.', 0)
  }

  const response = await fetch(`${apiBaseUrl}${path}`, init)

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as ApiErrorPayload | null
    const message = payload?.erro ?? `A API respondeu com o status ${response.status}.`

    throw new ApiError(message, response.status)
  }

  return response
}

export async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await request(path, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal,
  })

  return (await response.json()) as T
}

export async function sendJson(
  path: string,
  method: MutationMethod,
  body?: unknown,
  signal?: AbortSignal,
) {
  await request(path, {
    method,
    headers:
      body === undefined
        ? { Accept: 'application/json' }
        : { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  })
}
