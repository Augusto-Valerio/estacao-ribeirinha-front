import { useCallback, useEffect, useState } from 'react'
import { listNoticesByStation } from '../../../services/noticeService'
import type { Notice } from '../../../types/notice'

export type NoticesStatus = 'idle' | 'loading' | 'success' | 'error'

type NoticesState = {
  stationId: number | null
  notices: Notice[]
  status: NoticesStatus
}

const initialState: NoticesState = {
  stationId: null,
  notices: [],
  status: 'idle',
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}

function sortNoticesByMostRecent(notices: Notice[]) {
  return notices.toSorted(
    (first, second) => new Date(second.dataHora).getTime() - new Date(first.dataHora).getTime(),
  )
}

export function useStationNotices(stationId: number | null) {
  const [requestVersion, setRequestVersion] = useState(0)
  const [state, setState] = useState<NoticesState>(initialState)

  useEffect(() => {
    if (stationId === null) {
      return
    }

    const controller = new AbortController()

    listNoticesByStation(stationId, controller.signal)
      .then((response) => {
        setState({
          stationId,
          notices: sortNoticesByMostRecent(response),
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
