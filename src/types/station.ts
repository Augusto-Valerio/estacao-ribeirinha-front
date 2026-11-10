export type StationStatus = 'ATIVA' | 'MANUTENCAO' | 'INATIVA'

export type ReadingTrend = 'SUBINDO' | 'ESTAVEL' | 'DESCENDO'

export type Station = {
  idEstacao: number
  nome: string
  comunidade: string
  municipio: string
  uf: string
  status: StationStatus
}

export type Reading = {
  idLeitura: number
  idEstacao: number
  nivelAguaCm: number
  percentualBateria: number
  dataHora: string
  tendencia: ReadingTrend
}
