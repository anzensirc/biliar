type ISODateString = `${number}-${number}-${number}`;

interface TutupResponse {
  id: number;
  no: number;
  tanggalmulai: ISODateString;
  tanggalselesai: ISODateString;
  keterangan: string;
  aksi: string;
}
