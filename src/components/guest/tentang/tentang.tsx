"use client";

import Image from "next/image";

export default function Tentang() {
  return (
    <section className="px-28 py-8 max-w-7xl mx-auto space-y-16">
      {/* Bagian 1: Tentang Dongan */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Foto kiri */}
        <div className="w-full aspect-video bg-gray-300 relative overflow-hidden rounded">
          <Image
            src="/images/dongans.png"
            alt="Kantin Dongan"
            fill // Gunakan fill agar gambar mengisi container
            className="object-cover"
          />
        </div>

        {/* Teks kanan */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Tentang Donganta Billiard</h2>
          <p className="mb-4">
            Nikmati pengalaman bermain billiard terbaik dengan fasilitas modern,
            suasana nyaman, dan sistem pemesanan online yang praktis.
            <br />
            Ayo, <span className="font-bold">#MainDiDonganta!</span>
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Foto kiri */}
        <div className="w-full"></div>
        {/* Teks kanan */}
        <div>
          <p className="text-justify">
            Donganta Billiard lahir dari semangat untuk menghadirkan ruang
            hiburan yang berkualitas, terjangkau, dan dekat dengan komunitas.
            Berdiri kokoh pada tahun 2023 di kota yang penuh semangat
            kreativitas dan pergerakan komunitas olahraga, Donganta hadir bukan
            hanya sebagai tempat menikmati billiard, tapi juga sebagai wadah
            interaksi, silaturahmi, dan pengembangan minat.
            <br />
            <br />
            Berawal dari keinginan menghadirkan meja billiard berkualitas dengan
            harga bersahabat, dukungan pelanggan setia dan semangat untuk terus
            berinovasi membawa Donganta berkembang menjadi destinasi pilihan
            bagi penyuka billiard. Dilengkapi dengan fasilitas yang memadai,
            interior yang nyaman, dan pelayanan yang selalu siap membantu,
            Donganta terus berupaya menjadi yang terbaik di hati penggemar
            billiard.
          </p>
          <p className="mt-4 text-justify">
            Saat ini, Donganta tak hanya menyediakan arena bermain dengan
            kualitas terbaik, tapi juga warkop hangat untuk menemani para
            pengunjung bersantai bersama teman, mengisi perut dengan berbagai
            menu kopi dan camilan lezat. Semua itu hadir dengan pelayanan ramah,
            suasana nyaman, dan harga yang bersahabat. Donganta hadir sebagai
            jawabannya.
          </p>
        </div>
      </div>
      {/* Bagian 2: Aktivitas */}
      <div>
        <h2 className="text-xl font-bold mb-10 text-center">Aktivitas</h2>
        <div className="space-y-12">
          {/* 1. Turnamen */}
          <div className="md:flex md:items-start md:gap-8">
            <div className="md:w-1/2">
              <h3 className="font-semibold mb-2">🏆 Turnamen Biliar Rutin</h3>
              <p className="text-justify">
                Setiap bulan, Donganta menggelar turnamen terbuka yang
                mempertemukan para pemain terbaik lokal. Kompetisi ini menjadi
                ajang unjuk kemampuan sekaligus mempererat komunitas billiard.
              </p>
            </div>
            <Image
              src="/images/dongans.jpeg"
              alt="Turnamen Billiard"
              width={400}
              height={250}
              className="mt-4 md:mt-0 rounded"
            />
          </div>
          {/* 2. Live Music */}
          <div className="md:flex md:items-start md:gap-8 md:flex-row-reverse">
            <div className="md:w-1/2">
              <h3 className="font-semibold mb-2">
                🎤 Live Music & Nonton Bareng
              </h3>
              <p className="text-justify">
                Donganta juga menjadi tempat favorit untuk menikmati live music
                serta nonton bareng pertandingan olahraga, menciptakan suasana
                hangout yang santai dan menyenangkan.
              </p>
            </div>
            <Image
              src="/images/karaoke.jpeg"
              alt="Live Music"
              width={400}
              height={250}
              className="mt-4 md:mt-0 rounded"
            />
          </div>

          {/* 3. Warkop */}
          <div className="md:flex md:items-start md:gap-8">
            <div className="md:w-1/2">
              <h3 className="font-semibold mb-2">☕ Kantin & Menu Menarik</h3>
              <p className="text-justify">
                Tak hanya billiard, kami juga menyediakan kantin dengan beragam
                pilihan makanan dan minuman yang menggugah selera. Cocok untuk
                mengisi energi atau sekadar nongkrong santai bersama teman.
                Dengan fasilitas lengkap dan atmosfer yang nyaman, Donganta
                Billiard terus berkembang menjadi pusat hiburan billiard yang
                ramai dan digemari.
              </p>
            </div>
            <Image
              src="/images/warkop.jpeg"
              alt="Kantin Dongan"
              width={400}
              height={250}
              className="mt-4 md:mt-0 rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
