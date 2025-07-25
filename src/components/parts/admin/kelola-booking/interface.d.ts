export interface BookingResponse {
  id: number
  mejaId: number
  Tanggal: string
  Harga: string
  KodeBooking: string
  durasiJam: string
  TotalBayar?: number
  konfirmasi: boolean
  createdAt: string
  updatedAt: string
  deletedAt: any
  meja: Meja
  JamBooking: JamBooking[]
  BiodataBooking: BiodataBooking[]
}

export interface Meja {
  id: number
  NamaMeja: string
}

export interface JamBooking {
  id: number
  BookingId: number
  idMeja: number
  idJadwalMeja: number
  createdAt: string
  updatedAt: string
  deletedAt: any
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

export interface BiodataBooking {
  id: number
  BookingId: number
  Nama: string
  NoTelp: string
  Alamat: string
  Email?: string
  createdAt: string
  updatedAt: string
  deletedAt: any
}