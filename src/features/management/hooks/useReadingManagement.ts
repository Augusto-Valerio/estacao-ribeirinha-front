import { useCallback, useEffect, useState } from 'react'
import { ApiError } from '../../../services/apiClient'
import {
  createReading,
  deleteReading,
  listReadingsByStation,
  updateReading,
} from '../../../services/readingService'
import { listStations } from '../../../services/stationService'
import type { Reading, ReadingInput } from '../../../types/reading'
import type { Station } from '../../../types/station'

type RequestStatus = 'loading' | 'success' | 'error'
type MutationStatus = 'idle' | 'submitting'

type Feedback = {
  tone: 'success' | 'error'
  message: string
} | null

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}

function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return error.message
  }

  return 'Não foi possível concluir a operação. Tente novamente.'
}

function sortMostRecentFirst(readings: Reading[]) {
  return readings.toSorted(
    (first, second) => new Date(second.dataHora).getTime() - new Date(first.dataHora).getTime(),
  )
}

export function useReadingManagement() {
  const [stations, setStations] = useState<Station[]>([])
  const [selectedStationId, setSelectedStationId] = useState<number | null>(null)
  const [readings, setReadings] = useState<Reading[]>([])
  const [stationsStatus, setStationsStatus] = useState<RequestStatus>('loading')
  const [readingsStatus, setReadingsStatus] = useState<RequestStatus>('loading')
  const [mutationStatus, setMutationStatus] = useState<MutationStatus>('idle')
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [stationsRequestVersion, setStationsRequestVersion] = useState(0)
  const [readingsRequestVersion, setReadingsRequestVersion] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    listStations(controller.signal)
      .then((response) => {
        setStations(response)
        setSelectedStationId((currentId) => {
          const stillExists = response.some((station) => station.idEstacao === currentId)
          return stillExists ? currentId : (response[0]?.idEstacao ?? null)
        })
        setStationsStatus('success')
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setStations([])
        setSelectedStationId(null)
        setFeedback({ tone: 'error', message: getErrorMessage(error) })
        setStationsStatus('error')
      })

    return () => controller.abort()
  }, [stationsRequestVersion])

  useEffect(() => {
    if (selectedStationId === null) {
      return
    }

    const controller = new AbortController()

    listReadingsByStation(selectedStationId, controller.signal)
      .then((response) => {
        setReadings(sortMostRecentFirst(response))
        setReadingsStatus('success')
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setReadings([])
        setFeedback({ tone: 'error', message: getErrorMessage(error) })
        setReadingsStatus('error')
      })

    return () => controller.abort()
  }, [readingsRequestVersion, selectedStationId])

  const retryStations = useCallback(() => {
    setFeedback(null)
    setStationsStatus('loading')
    setStationsRequestVersion((version) => version + 1)
  }, [])

  const retryReadings = useCallback(() => {
    setFeedback(null)
    setReadingsStatus('loading')
    setReadingsRequestVersion((version) => version + 1)
  }, [])

  const selectStation = useCallback((stationId: number) => {
    setFeedback(null)
    setReadings([])
    setReadingsStatus('loading')
    setSelectedStationId(stationId)
  }, [])

  const submitReading = useCallback(async (reading: ReadingInput, readingId?: number) => {
    setFeedback(null)
    setMutationStatus('submitting')

    try {
      if (readingId === undefined) {
        await createReading(reading)
      } else {
        await updateReading(readingId, reading)
      }

      const response = await listReadingsByStation(reading.idEstacao)
      setSelectedStationId(reading.idEstacao)
      setReadings(sortMostRecentFirst(response))
      setReadingsStatus('success')
      setFeedback({
        tone: 'success',
        message:
          readingId === undefined
            ? 'Leitura cadastrada com sucesso.'
            : 'Leitura atualizada com sucesso.',
      })
      return true
    } catch (error: unknown) {
      setFeedback({ tone: 'error', message: getErrorMessage(error) })
      return false
    } finally {
      setMutationStatus('idle')
    }
  }, [])

  const removeReading = useCallback(
    async (readingId: number) => {
      if (selectedStationId === null) {
        return false
      }

      setFeedback(null)
      setMutationStatus('submitting')

      try {
        await deleteReading(readingId)
        const response = await listReadingsByStation(selectedStationId)
        setReadings(sortMostRecentFirst(response))
        setReadingsStatus('success')
        setFeedback({ tone: 'success', message: 'Leitura excluída com sucesso.' })
        return true
      } catch (error: unknown) {
        setFeedback({ tone: 'error', message: getErrorMessage(error) })
        return false
      } finally {
        setMutationStatus('idle')
      }
    },
    [selectedStationId],
  )

  const clearFeedback = useCallback(() => setFeedback(null), [])

  return {
    stations,
    selectedStationId,
    readings,
    stationsStatus,
    readingsStatus,
    mutationStatus,
    feedback,
    retryStations,
    retryReadings,
    selectStation,
    submitReading,
    removeReading,
    clearFeedback,
  }
}
