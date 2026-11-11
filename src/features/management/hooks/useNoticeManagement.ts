import { useCallback, useEffect, useState } from 'react'
import { ApiError } from '../../../services/apiClient'
import {
  createNotice,
  deleteNotice,
  listNoticesByStation,
  updateNotice,
} from '../../../services/noticeService'
import { listStations } from '../../../services/stationService'
import type { Notice, NoticeInput } from '../../../types/notice'
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

function sortMostRecentFirst(notices: Notice[]) {
  return notices.toSorted(
    (first, second) => new Date(second.dataHora).getTime() - new Date(first.dataHora).getTime(),
  )
}

export function useNoticeManagement() {
  const [stations, setStations] = useState<Station[]>([])
  const [selectedStationId, setSelectedStationId] = useState<number | null>(null)
  const [notices, setNotices] = useState<Notice[]>([])
  const [stationsStatus, setStationsStatus] = useState<RequestStatus>('loading')
  const [noticesStatus, setNoticesStatus] = useState<RequestStatus>('loading')
  const [mutationStatus, setMutationStatus] = useState<MutationStatus>('idle')
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [stationsRequestVersion, setStationsRequestVersion] = useState(0)
  const [noticesRequestVersion, setNoticesRequestVersion] = useState(0)

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

    listNoticesByStation(selectedStationId, controller.signal)
      .then((response) => {
        setNotices(sortMostRecentFirst(response))
        setNoticesStatus('success')
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setNotices([])
        setFeedback({ tone: 'error', message: getErrorMessage(error) })
        setNoticesStatus('error')
      })

    return () => controller.abort()
  }, [noticesRequestVersion, selectedStationId])

  const retryStations = useCallback(() => {
    setFeedback(null)
    setStationsStatus('loading')
    setStationsRequestVersion((version) => version + 1)
  }, [])

  const retryNotices = useCallback(() => {
    setFeedback(null)
    setNoticesStatus('loading')
    setNoticesRequestVersion((version) => version + 1)
  }, [])

  const selectStation = useCallback((stationId: number) => {
    setFeedback(null)
    setNotices([])
    setNoticesStatus('loading')
    setSelectedStationId(stationId)
  }, [])

  const submitNotice = useCallback(async (notice: NoticeInput, noticeId?: number) => {
    setFeedback(null)
    setMutationStatus('submitting')

    try {
      if (noticeId === undefined) {
        await createNotice(notice)
      } else {
        await updateNotice(noticeId, notice)
      }

      const response = await listNoticesByStation(notice.idEstacao)
      setSelectedStationId(notice.idEstacao)
      setNotices(sortMostRecentFirst(response))
      setNoticesStatus('success')
      setFeedback({
        tone: 'success',
        message:
          noticeId === undefined
            ? 'Aviso cadastrado com sucesso.'
            : 'Aviso atualizado com sucesso.',
      })
      return true
    } catch (error: unknown) {
      setFeedback({ tone: 'error', message: getErrorMessage(error) })
      return false
    } finally {
      setMutationStatus('idle')
    }
  }, [])

  const removeNotice = useCallback(
    async (noticeId: number) => {
      if (selectedStationId === null) {
        return false
      }

      setFeedback(null)
      setMutationStatus('submitting')

      try {
        await deleteNotice(noticeId)
        const response = await listNoticesByStation(selectedStationId)
        setNotices(sortMostRecentFirst(response))
        setNoticesStatus('success')
        setFeedback({ tone: 'success', message: 'Aviso excluído com sucesso.' })
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
    notices,
    stationsStatus,
    noticesStatus,
    mutationStatus,
    feedback,
    retryStations,
    retryNotices,
    selectStation,
    submitNotice,
    removeNotice,
    clearFeedback,
  }
}
