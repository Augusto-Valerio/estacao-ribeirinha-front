import { getJson, sendJson } from './apiClient'
import type { Notice, NoticeInput } from '../types/notice'

export function listNoticesByStation(stationId: number, signal?: AbortSignal) {
  return getJson<Notice[]>(`/avisos/estacao/${stationId}`, signal)
}

export function createNotice(notice: NoticeInput, signal?: AbortSignal) {
  return sendJson('/avisos', 'POST', notice, signal)
}

export function updateNotice(
  noticeId: number,
  notice: NoticeInput,
  signal?: AbortSignal,
) {
  return sendJson(`/avisos/${noticeId}`, 'PUT', notice, signal)
}

export function deleteNotice(noticeId: number, signal?: AbortSignal) {
  return sendJson(`/avisos/${noticeId}`, 'DELETE', undefined, signal)
}
