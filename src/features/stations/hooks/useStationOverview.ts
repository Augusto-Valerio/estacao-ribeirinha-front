import { useCallback, useEffect, useState } from 'react'
import { getLatestReading, listStations } from '../../../services/stationService'
import type { Reading } from '../../../types/reading'
import type { Station } from '../../../types/station'

type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}

export function useStationOverview() {
  const [stations, setStations] = useState<Station[]>([])
  const [selectedStationId, setSelectedStationId] = useState<number | null>(null)
  const [latestReading, setLatestReading] = useState<Reading | null>(null)
  const [stationsStatus, setStationsStatus] = useState<RequestStatus>('loading')
  const [readingStatus, setReadingStatus] = useState<RequestStatus>('idle')
  const [stationsRequestVersion, setStationsRequestVersion] = useState(0)
  const [readingRequestVersion, setReadingRequestVersion] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    listStations(controller.signal)
      .then((response) => {
        setStations(response)
        setLatestReading(null)
        setReadingStatus(response.length > 0 ? 'loading' : 'idle')
        setSelectedStationId((currentId) => {
          const currentStationStillExists = response.some(
            (station) => station.idEstacao === currentId,
          )

          return currentStationStillExists ? currentId : (response[0]?.idEstacao ?? null)
        })
        setStationsStatus('success')
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setStations([])
        setSelectedStationId(null)
        setLatestReading(null)
        setReadingStatus('idle')
        setStationsStatus('error')
      })

    return () => controller.abort()
  }, [stationsRequestVersion])

  useEffect(() => {
    if (selectedStationId === null) {
      return
    }

    const controller = new AbortController()

    getLatestReading(selectedStationId, controller.signal)
      .then((response) => {
        setLatestReading(response)
        setReadingStatus('success')
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setLatestReading(null)
        setReadingStatus('error')
      })

    return () => controller.abort()
  }, [readingRequestVersion, selectedStationId])

  const retryStations = useCallback(() => {
    setStationsStatus('loading')
    setStationsRequestVersion((currentVersion) => currentVersion + 1)
  }, [])

  const retryReading = useCallback(() => {
    setLatestReading(null)
    setReadingStatus('loading')
    setReadingRequestVersion((currentVersion) => currentVersion + 1)
  }, [])

  const selectStation = useCallback((stationId: number) => {
    setLatestReading(null)
    setReadingStatus('loading')
    setSelectedStationId(stationId)
  }, [])

  const selectedStation =
    stations.find((station) => station.idEstacao === selectedStationId) ?? null

  return {
    stations,
    selectedStation,
    selectedStationId,
    latestReading,
    stationsStatus,
    readingStatus,
    selectStation,
    retryStations,
    retryReading,
  }
}
