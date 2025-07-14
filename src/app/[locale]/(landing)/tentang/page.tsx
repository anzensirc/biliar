import React from "react";
import Tentang from "@/components/guest/tentang/tentang";
import Footer from "@/components/guest/common/footer";
import Navbar from "@/components/guest/common/navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-20 pt-24">
        <Tentang />
      </main>
      <Footer />
    </>
  );
}
