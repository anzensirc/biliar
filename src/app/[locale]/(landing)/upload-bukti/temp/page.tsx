import React from "react";
import Tentang from "@/components/guest/tentang/tentang";
import Navbar from "@/components/guest/common/navbar";
import BuktiUploadTempPage from "@/components/guest/upload/upload-temp";
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-20 pt-24">
        <BuktiUploadTempPage/>
      </main>
    </>
  );
}
