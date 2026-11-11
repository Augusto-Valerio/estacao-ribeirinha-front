import { useCallback, useEffect, useState } from 'react'
import { listStations } from '../../../services/stationService'
import type { Station } from '../../../types/station'
import { useStationNotices } from './useStationNotices'

type StationsStatus = 'loading' | 'success' | 'error'

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}

export function useNoticesPage() {
  const [stations, setStations] = useState<Station[]>([])
  const [selectedStationId, setSelectedStationId] = useState<number | null>(null)
  const [stationsStatus, setStationsStatus] = useState<StationsStatus>('loading')
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    listStations(controller.signal)
      .then((response) => {
        setStations(response)
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
        setStationsStatus('error')
      })

    return () => controller.abort()
  }, [requestVersion])

  const { notices, status: noticesStatus, retry: retryNotices } =
    useStationNotices(selectedStationId)

  const retryStations = useCallback(() => {
    setStationsStatus('loading')
    setRequestVersion((currentVersion) => currentVersion + 1)
  }, [])

  const selectStation = useCallback((stationId: number) => {
    setSelectedStationId(stationId)
  }, [])

  const selectedStation =
    stations.find((station) => station.idEstacao === selectedStationId) ?? null

  return {
    stations,
    selectedStation,
    selectedStationId,
    stationsStatus,
    notices,
    noticesStatus,
    selectStation,
    retryStations,
    retryNotices,
  }
}
