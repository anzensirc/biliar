import Link from "next/link";
export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
      <nav className="flex flex-col space-y-2">
        <Link href="/dashboard" className="hover:bg-white-500 p-2 rounded">
          Dashboard
        </Link>
        <Link
          href="/dashboard/kelolaMeja"
          className="hover:bg-white-500 p-2 rounded"
        >
          Kelola Meja
        </Link>
        <Link
          href="/dashboard/kelolaBooking"
          className="hover:bg-white-500p-2 rounded"
        >
          Kelola Booking
        </Link>
        <Link
          href="/dashboard/riwayatTransaksi"
          className="hover:bg-white-500 p-2 rounded"
        >
          Riwayat Transaksi
        </Link>
        <Link
          href="/dashboard/KelolaBanner"
          className="hover:bg-white-500 p-2 rounded"
        >
          Kelola Banner
        </Link>
        <Link
          href="/dashboard/kelolaTutup"
          className="hover:bg-white-500 p-2 rounded"
        >
          Kelola Tutup
        </Link>
      </nav>
    </aside>
  );
}
