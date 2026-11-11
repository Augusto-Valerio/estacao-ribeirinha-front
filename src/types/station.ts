export type StationStatus = 'ATIVA' | 'MANUTENCAO' | 'INATIVA'

export type Station = {
  idEstacao: number
  nome: string
  comunidade: string
  municipio: string
  uf: string
  status: StationStatus
}

export type StationInput = Omit<Station, 'idEstacao'>
