import CariBooking from "@/components/guest/caribooking/caribooking";
import Navbar from "@/components/guest/common/navbar";
export default function Home() {
  return (
    <div>
      <div className="mt-10 mb-20">
        <Navbar />
      </div>
      <CariBooking/>
    </div>
  );
}
