import Booking from "@/components/guest/booking/booking";
import Navbar from "@/components/guest/common/navbar";
import Footer from "@/components/guest/common/footer";
export default function Home() {
  return (
    <>
      {/* Fixed di atas, di luar main */}
      <main className="flex flex-col gap-20 pt-24">
        <Navbar />
        <Booking/>
        <Footer />
      </main>
    </>
  );
}
