export type NoticeLevel = 'INFORMATIVO' | 'ATENCAO' | 'CRITICO'

export type NoticeStatus = 'ATIVO' | 'ENCERRADO'

export type Notice = {
  idAviso: number
  idEstacao: number
  titulo: string
  mensagem: string
  nivel: NoticeLevel
  status: NoticeStatus
  dataHora: string
}

export type NoticeInput = Omit<Notice, 'idAviso'>
