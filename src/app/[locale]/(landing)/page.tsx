import Hero from "@/components/guest/dashboard/hero";
import Banner from "@/components/guest/dashboard/banner";
import Navbar from "@/components/guest/common/navbar";
import Footer from "@/components/guest/common/footer";

export default function Home() {
  return (
    <main className="flex flex-col gap-20">
      <Navbar />
      <Hero />
      <Banner />
      <Footer />
    </main>
  );
}
