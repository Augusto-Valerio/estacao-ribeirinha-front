import { ApiError, getJson } from './apiClient'
import type { Reading, Station } from '../types/station'

export function listStations(signal?: AbortSignal) {
  return getJson<Station[]>('/estacoes', signal)
}

export async function getLatestReading(
  stationId: number,
  signal?: AbortSignal,
): Promise<Reading | null> {
  try {
    return await getJson<Reading>(`/leituras/estacao/${stationId}/ultima`, signal)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null
    }

    throw error
  }
}
