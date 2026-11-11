import { ApiError, getJson, sendJson } from './apiClient'
import type { Reading } from '../types/reading'
import type { Station, StationInput } from '../types/station'

export function listStations(signal?: AbortSignal) {
  return getJson<Station[]>('/estacoes', signal)
}

export function createStation(station: StationInput, signal?: AbortSignal) {
  return sendJson('/estacoes', 'POST', station, signal)
}

export function updateStation(
  stationId: number,
  station: StationInput,
  signal?: AbortSignal,
) {
  return sendJson(`/estacoes/${stationId}`, 'PUT', station, signal)
}

export function deleteStation(stationId: number, signal?: AbortSignal) {
  return sendJson(`/estacoes/${stationId}`, 'DELETE', undefined, signal)
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
