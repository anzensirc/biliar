
export interface BookingResponse {
  id: number
  mejaId: number
  Tanggal: string
  Harga: string
  KodeBooking: string
  durasiJam: string
  TotalBayar: any
  konfirmasi: boolean
  createdAt: string
  updatedAt: string
  deletedAt: any
  meja: Meja
  BuktiPembayaran: BuktiPembayaran[]
}

export interface Meja {
  id: number
  NamaMeja: string
  JamBooking: JamBooking[]
}

export interface JamBooking {
  JadwalMeja: JadwalMeja
}

export interface JadwalMeja {
  id: number
  mejaId: number
  StartTime: string
  EndTime: string
  Status: string
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface BuktiPembayaran {
  id: number
  Foto: string
  createdAt: string
}