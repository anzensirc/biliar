interface BookingResponse {
  id: number;
  mejaId: number;
  Tanggal: string;
  Harga: string;
  KodeBooking: string;
  durasiJam: string;
  TotalBayar: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  meja: Meja;
  BuktiPembayaran: any[];
}

export interface Meja {
  id: number
  NamaMeja: string
  JamBooking: JamBooking[]
}
{
    "message": "Semua jadwal tutup",
    "data": [
        {
            "id": 1,
            "startdate": "2025-07-12T00:00:00.000Z",
            "enddate": "2025-07-12T23:59:00.000Z",
            "Deskripsi": "Tutup karena tidak ada pegawai",
            "createdAt": "2025-07-16T07:31:22.053Z",
            "updatedAt": "2025-07-16T07:31:22.053Z",
            "deletedAt": null
        }
    ]
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
