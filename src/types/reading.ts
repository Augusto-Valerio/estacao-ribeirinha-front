export type ReadingTrend = 'SUBINDO' | 'ESTAVEL' | 'DESCENDO'

export type Reading = {
  idLeitura: number
  idEstacao: number
  nivelAguaCm: number
  percentualBateria: number
  dataHora: string
  tendencia: ReadingTrend
}
