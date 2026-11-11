import { useMemo } from 'react'
import { useStationNotices } from './useStationNotices'

export type { NoticesStatus as ActiveNoticesStatus } from './useStationNotices'

export function useActiveNotices(stationId: number | null) {
  const { notices, status, retry } = useStationNotices(stationId)
  const activeNotices = useMemo(
    () => notices.filter((notice) => notice.status === 'ATIVO'),
    [notices],
  )

  return {
    notices: activeNotices,
    status,
    retry,
  }
}
