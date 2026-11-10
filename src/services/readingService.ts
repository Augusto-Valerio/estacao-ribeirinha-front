import { getJson } from './apiClient'
import type { Reading } from '../types/reading'

export function listReadingsByStation(stationId: number, signal?: AbortSignal) {
  return getJson<Reading[]>(`/leituras/estacao/${stationId}`, signal)
}
