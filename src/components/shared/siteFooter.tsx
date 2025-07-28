import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#FFFBE5] border-t border-[#D1AC3B] text-[#00819B]">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-6">
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <p className="text-sm text-[#00819B] font-semibold">
            &copy; {new Date().getFullYear()} Dongans Billiard
          </p>
          <p className="text-xs text-[#00819B]">
            Dikembangkan oleh Developer
          </p>  
        </div>

        <div className="flex gap-4 text-sm font-medium">
          <Link
            href="/"
            className="hover:text-[#FFD700] transition-colors"
          >
            Beranda
          </Link>
          <Link
            href="/tentang"
            className="hover:text-[#FFD700] transition-colors"
          >
            Tentang
          </Link>
        </div>
      </div>
    </footer>
  );
}
