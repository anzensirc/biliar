export interface SettingResponse {
  id: string
  logoUrl: string
  deskripsi: string
  alamat: string
  kodePos: string
  telepon: string[],
  faks: string
  email: string
  jamOperasional: string
  sosialMedia: SosialMedia[]
  copyright: string
  developer: string
  createdAt: string
  updatedAt: string
}

export interface SosialMedia {
  url: string
  platform: string
}