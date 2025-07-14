import React from "react";
import Tentang from "@/components/guest/tentang/tentang";
import Navbar from "@/components/guest/common/navbar";
import UploadBukti from "@/components/guest/upload/upload";
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-20 pt-24">
        <UploadBukti />
      </main>
    </>
  );
}
