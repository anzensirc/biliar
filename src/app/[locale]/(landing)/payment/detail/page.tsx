import Navbar from "@/components/guest/common/navbar";
import PaymentDetail from "@/components/guest/payment/paymentdetail";
import UploadBukti from "@/components/guest/upload/upload";
export default function Home() {
  return (
    <div>
      <div className="mt-10 mb-20">
        <Navbar />
      </div>
      <PaymentDetail />
      <div className="mt-10 mb-20">
        <UploadBukti />
      </div>
    </div>
  );
}
