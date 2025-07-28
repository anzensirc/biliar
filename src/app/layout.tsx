import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { cn } from "@/lib/utils";
import "react-datepicker/dist/react-datepicker.css";
import ThemeProvider from "@/components/shared/themeProvider";
import { Toaster } from "sonner";
import Script from "next/script";
import { MyAlertDialog } from "@/components/shared/customAlertDialog";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dongan BilliarD",
    description: "Website Hasil Projek KP dengan Studi Kasus Dongan BilliarD",
    icons: {
      icon: [
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: "/icon-192.png", // digunakan di perangkat Apple
    },
  };
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const { children } = props;
  const locale = await getLocale(); // ✅ ganti dari params
  const messages = await getMessages({ locale: locale });

  // default seo
  const tagManager = "";
  const googleTagManager = "";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* GTM Script */}
        <Script id="GT">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${tagManager}');`}
        </Script>
        <Script id="GTM">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtag/js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${googleTagManager}');`}
        </Script>
      </head>
      <body className={cn(inter.className, "scroll-smooth")}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <QueryProvider> {children}</QueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Toaster visibleToasts={20} />
        {/* GTM NoScript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${tagManager}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManager}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <MyAlertDialog />
      </body>
    </html>
  );
}
