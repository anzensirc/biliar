import Navbar from "@/components/guest/common/navbar";
import Footer from "@/components/guest/common/footer";
import Highlight from "@/components/guest/highlight/highlight";
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-20">
        <Highlight />
      </main>
      <Footer />
    </>
  );
}