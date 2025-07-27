export interface JadwalMeja {
  id: number;
  mejaId: number;
  StartTime: string;
  EndTime: string;
  Status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  meja: Meja;
  status: string;
}
export interface Meja {
  id: number;
  NamaMeja: string;
  Foto: string;
  Deskripsi: string;
  Harga: string;
  NoMeja: string;
  TipeMeja: string;
  IsActive: boolean;
  Closed: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}
