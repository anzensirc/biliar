// app/landing/dashboard/layout.tsx
import Footer from "@/components/guest/common/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* <Footer /> */}
    </>
  );
}
