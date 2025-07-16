export interface Root {
  status: number;
  message: string;
  data: Daum[];
}

export interface Daum{
  bulan: string;
  totalBooking: number;
  totalPendapatan: number;
  totalMeja: number;
}