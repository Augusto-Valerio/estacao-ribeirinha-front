import { getJson, sendJson } from './apiClient'
import type { Reading, ReadingInput } from '../types/reading'

export function listReadingsByStation(stationId: number, signal?: AbortSignal) {
  return getJson<Reading[]>(`/leituras/estacao/${stationId}`, signal)
}

export function createReading(reading: ReadingInput, signal?: AbortSignal) {
  const { tendencia: _calculatedByApi, ...createPayload } = reading

  return sendJson('/leituras', 'POST', createPayload, signal)
}

export function updateReading(
  readingId: number,
  reading: ReadingInput,
  signal?: AbortSignal,
) {
  return sendJson(`/leituras/${readingId}`, 'PUT', reading, signal)
}

export function deleteReading(readingId: number, signal?: AbortSignal) {
  return sendJson(`/leituras/${readingId}`, 'DELETE', undefined, signal)
}
