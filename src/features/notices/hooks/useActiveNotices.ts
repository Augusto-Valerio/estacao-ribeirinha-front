import { useCallback, useEffect, useState } from 'react'
import { listNoticesByStation } from '../../../services/noticeService'
import type { Notice } from '../../../types/notice'

export type ActiveNoticesStatus = 'idle' | 'loading' | 'success' | 'error'

type ActiveNoticesState = {
  stationId: number | null
  notices: Notice[]
  status: ActiveNoticesStatus
}

const initialState: ActiveNoticesState = {
  stationId: null,
  notices: [],
  status: 'idle',
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}

function selectActiveNotices(notices: Notice[]) {
  return notices
    .filter((notice) => notice.status === 'ATIVO')
    .toSorted(
      (first, second) => new Date(second.dataHora).getTime() - new Date(first.dataHora).getTime(),
    )
}

export function useActiveNotices(stationId: number | null) {
  const [requestVersion, setRequestVersion] = useState(0)
  const [state, setState] = useState<ActiveNoticesState>(initialState)

  useEffect(() => {
    if (stationId === null) {
      return
    }

    const controller = new AbortController()

    listNoticesByStation(stationId, controller.signal)
      .then((response) => {
        setState({
          stationId,
          notices: selectActiveNotices(response),
          status: 'success',
        })
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setState({ stationId, notices: [], status: 'error' })
      })

    return () => controller.abort()
  }, [requestVersion, stationId])

  const retry = useCallback(() => {
    if (stationId === null) {
      return
    }

    setState({ stationId, notices: [], status: 'loading' })
    setRequestVersion((currentVersion) => currentVersion + 1)
  }, [stationId])

  const isCurrentStation = state.stationId === stationId

  return {
    notices: isCurrentStation ? state.notices : [],
    status: stationId === null ? 'idle' : isCurrentStation ? state.status : 'loading',
    retry,
  }
}
