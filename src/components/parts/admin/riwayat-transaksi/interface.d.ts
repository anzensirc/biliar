export interface BookingResponse {
  total_items: number;
  page: number;
  items: BookingItem[];
  total_pages: number;
  current_page: number;
  links: Links;
}

export interface Links {
  first: string;
  last: string;
  next: string | null;
  prev: string | null;
}

export interface BookingItem {
  id: number;
  mejaId: number;
  Tanggal: string;
  Harga: string;
  KodeBooking: string;
  durasiJam: string;
  TotalBayar: number;
  konfirmasi: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  meja: Meja;
  BuktiPembayaran: BuktiPembayaran[];
}

export interface Meja {
  id: number;
  NamaMeja: string;
  JamBooking: JamBooking[];
}

export interface JamBooking {
  JadwalMeja: JadwalMeja;
}

export interface JadwalMeja {
  id: number;
  mejaId: number;
  StartTime: string;
  EndTime: string;
  Status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BuktiPembayaran {
  id: number;
  Foto: string;
  createdAt: string;
}

// Untuk response detail (opsional jika pakai getBookingById)
export interface BookingDetailResponse {
  id: number;
  mejaId: number;
  Tanggal: string;
  Harga: string;
  KodeBooking: string;
  durasiJam: string;
  TotalBayar: number;
  konfirmasi: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  meja: Meja;
  BiodataBooking: Biodata[];
}

export interface Biodata {
  id: number;
  nama: string;
  telepon: string;
  email?: string;
  createdAt: string;
}