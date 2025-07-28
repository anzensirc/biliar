import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#00819B] text-white shadow-md">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/logo-dongan.png"
            alt="Dongans Logo"
            width={32}
            height={32}
            className="rounded"
          />
          <span className="text-xl font-bold tracking-wide text-white hover:text-[#FFD700] transition-colors">
            Dongans Billiard
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm hover:text-[#FFD700] transition-colors"
          >
            Beranda
          </Link>
          <Link
            href="/tentang"
            className="text-sm hover:text-[#FFD700] transition-colors"
          >
            Tentang
          </Link>
          <a
            href="https://maps.app.goo.gl/8xGD1b5MM5WYrbVj7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-[#FFD700] transition-colors"
          >
            Lokasi
          </a>
        </nav>
      </div>
    </header>
  );
}
