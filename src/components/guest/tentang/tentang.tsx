"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Tentang() {
  return (
    <section className="px-8 sm:px-10 md:px-20 lg:px-28 pt-4 pb-14 max-w-7xl mx-auto space-y-16">
      {/* Bagian 1: Tentang Dongan */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-8 items-start"
      >
        <div className="w-full aspect-[16/9] bg-gray-300 relative overflow-hidden rounded">
          <Image
            src="/images/dongans.png"
            alt="Kantin Dongan"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Teks kanan */}
        <div className="text-justify">
          <h2 className="text-2xl font-bold mb-4">Tentang Donganta Billiard</h2>
          <p className="mb-4">
            Nikmati pengalaman bermain billiard terbaik dengan fasilitas modern,
            suasana nyaman, dan sistem pemesanan online yang praktis.
            <br />
            Ayo, <span className="font-bold">#MainDiDonganta!</span>
          </p>
        </div>
      </motion.div>

      {/* Deskripsi panjang */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-8 items-start"
      >
        <div className="w-full" />
        <div className="text-justify">
          <p>
            Donganta Billiard lahir dari semangat untuk menghadirkan ruang hiburan yang berkualitas, terjangkau, dan dekat dengan komunitas. Berdiri kokoh pada tahun 2023 di kota yang penuh semangat kreativitas dan pergerakan komunitas olahraga, Donganta hadir bukan hanya sebagai tempat menikmati billiard, tapi juga sebagai wadah interaksi, silaturahmi, dan pengembangan minat.
            <br />
            <br />
            Berawal dari keinginan menghadirkan meja billiard berkualitas dengan harga bersahabat, dukungan pelanggan setia dan semangat untuk terus berinovasi membawa Donganta berkembang menjadi destinasi pilihan bagi penyuka billiard. Dilengkapi dengan fasilitas yang memadai, interior yang nyaman, dan pelayanan yang selalu siap membantu, Donganta terus berupaya menjadi yang terbaik di hati penggemar billiard.
          </p>
          <p className="mt-4">
            Saat ini, Donganta tak hanya menyediakan arena bermain dengan kualitas terbaik, tapi juga warkop hangat untuk menemani para pengunjung bersantai bersama teman, mengisi perut dengan berbagai menu kopi dan camilan lezat. Semua itu hadir dengan pelayanan ramah, suasana nyaman, dan harga yang bersahabat. Donganta hadir sebagai jawabannya.
          </p>
        </div>
      </motion.div>

      {/* Bagian 2: Aktivitas */}
      <div>
        <h2 className="text-xl font-bold mb-10 text-center">Aktivitas</h2>
        <div className="space-y-12">
          {[
            {
              title: "🏆 Turnamen Biliar Rutin",
              text: `Setiap bulan, Donganta menggelar turnamen terbuka yang mempertemukan para pemain terbaik lokal. Kompetisi ini menjadi ajang unjuk kemampuan sekaligus mempererat komunitas billiard.`,
              image: "/images/dongans.jpeg",
              alt: "Turnamen Billiard",
            },
            {
              title: "🎤 Live Music & Nonton Bareng",
              text: `Donganta juga menjadi tempat favorit untuk menikmati live music serta nonton bareng pertandingan olahraga, menciptakan suasana hangout yang santai dan menyenangkan.`,
              image: "/images/karaoke.jpeg",
              alt: "Live Music",
            },
            {
              title: "☕ Kantin & Menu Menarik",
              text: `Tak hanya billiard, kami juga menyediakan kantin dengan beragam pilihan makanan dan minuman yang menggugah selera. Cocok untuk mengisi energi atau sekadar nongkrong santai bersama teman. Dengan fasilitas lengkap dan atmosfer yang nyaman, Donganta Billiard terus berkembang menjadi pusat hiburan billiard yang ramai dan digemari.`,
              image: "/images/warkop.jpeg",
              alt: "Kantin Dongan",
            },
          ].map(({ title, text, image, alt }, index) => {
            const isReverse = index % 2 === 1;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex flex-col ${
                  isReverse ? "md:flex-row-reverse" : "md:flex-row"
                } md:items-start md:gap-8`}
              >
                <div className="md:w-1/2">
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-justify">{text}</p>
                </div>
                <div className="w-full md:w-auto mt-4 md:mt-0">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Image
                      src={image}
                      alt={alt}
                      width={400}
                      height={250}
                      className="w-full max-w-md h-auto rounded shadow-lg"
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
