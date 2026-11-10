import { useCallback, useEffect, useState } from 'react'
import { listReadingsByStation } from '../../../services/readingService'
import type { Reading } from '../../../types/reading'

export type ReadingHistoryStatus = 'idle' | 'loading' | 'success' | 'error'

type ReadingHistoryState = {
  stationId: number | null
  readings: Reading[]
  status: ReadingHistoryStatus
}

const initialState: ReadingHistoryState = {
  stationId: null,
  readings: [],
  status: 'idle',
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}

function sortReadings(readings: Reading[]) {
  return readings.toSorted(
    (first, second) => new Date(first.dataHora).getTime() - new Date(second.dataHora).getTime(),
  )
}

export function useReadingHistory(stationId: number | null) {
  const [requestVersion, setRequestVersion] = useState(0)
  const [state, setState] = useState<ReadingHistoryState>(initialState)

  useEffect(() => {
    if (stationId === null) {
      return
    }

    const controller = new AbortController()

    listReadingsByStation(stationId, controller.signal)
      .then((response) => {
        setState({
          stationId,
          readings: sortReadings(response),
          status: 'success',
        })
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setState({ stationId, readings: [], status: 'error' })
      })

    return () => controller.abort()
  }, [requestVersion, stationId])

  const retry = useCallback(() => {
    if (stationId === null) {
      return
    }

    setState({ stationId, readings: [], status: 'loading' })
    setRequestVersion((currentVersion) => currentVersion + 1)
  }, [stationId])

  const isCurrentStation = state.stationId === stationId

  return {
    readings: isCurrentStation ? state.readings : [],
    status: stationId === null ? 'idle' : isCurrentStation ? state.status : 'loading',
    retry,
  }
}
