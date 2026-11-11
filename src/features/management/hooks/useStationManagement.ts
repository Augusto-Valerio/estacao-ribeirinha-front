import { useCallback, useEffect, useState } from 'react'
import { ApiError } from '../../../services/apiClient'
import {
  createStation,
  deleteStation,
  listStations,
  updateStation,
} from '../../../services/stationService'
import type { Station, StationInput } from '../../../types/station'

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

export function useStationManagement() {
  const [stations, setStations] = useState<Station[]>([])
  const [status, setStatus] = useState<RequestStatus>('loading')
  const [mutationStatus, setMutationStatus] = useState<MutationStatus>('idle')
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    listStations(controller.signal)
      .then((response) => {
        setStations(response)
        setStatus('success')
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setStations([])
        setFeedback({ tone: 'error', message: getErrorMessage(error) })
        setStatus('error')
      })

    return () => controller.abort()
  }, [requestVersion])

  const retry = useCallback(() => {
    setFeedback(null)
    setStatus('loading')
    setRequestVersion((currentVersion) => currentVersion + 1)
  }, [])

  const submitStation = useCallback(async (station: StationInput, stationId?: number) => {
    setFeedback(null)
    setMutationStatus('submitting')

    try {
      if (stationId === undefined) {
        await createStation(station)
      } else {
        await updateStation(stationId, station)
      }

      const response = await listStations()
      setStations(response)
      setStatus('success')
      setFeedback({
        tone: 'success',
        message:
          stationId === undefined
            ? 'Estação cadastrada com sucesso.'
            : 'Estação atualizada com sucesso.',
      })
      return true
    } catch (error: unknown) {
      setFeedback({ tone: 'error', message: getErrorMessage(error) })
      return false
    } finally {
      setMutationStatus('idle')
    }
  }, [])

  const removeStation = useCallback(async (stationId: number) => {
    setFeedback(null)
    setMutationStatus('submitting')

    try {
      await deleteStation(stationId)
      const response = await listStations()
      setStations(response)
      setStatus('success')
      setFeedback({ tone: 'success', message: 'Estação excluída com sucesso.' })
      return true
    } catch (error: unknown) {
      setFeedback({ tone: 'error', message: getErrorMessage(error) })
      return false
    } finally {
      setMutationStatus('idle')
    }
  }, [])

  const clearFeedback = useCallback(() => setFeedback(null), [])

  return {
    stations,
    status,
    mutationStatus,
    feedback,
    retry,
    submitStation,
    removeStation,
    clearFeedback,
  }
}
