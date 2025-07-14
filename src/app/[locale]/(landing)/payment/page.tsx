import Navbar from "@/components/guest/common/navbar";
import Payment from "@/components/guest/payment/payment";

export default function Home() {
  return (
    <main className="flex flex-col gap-20">
      <Navbar />
      <Payment />
    </main>
  );
}
