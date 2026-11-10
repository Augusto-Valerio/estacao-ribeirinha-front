import { getJson } from './apiClient'
import type { Notice } from '../types/notice'

export function listNoticesByStation(stationId: number, signal?: AbortSignal) {
  return getJson<Notice[]>(`/avisos/estacao/${stationId}`, signal)
}
