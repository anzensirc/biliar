import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

export const isProduction = process.env.NEXT_PUBLIC_MODE === "PRODUCTION";

const withNextIntl = createNextIntlPlugin({
  // Kalau perlu, bisa override message path atau localePrefix manual di sini
  // default behavior: akan ambil dari `src/i18n/routing.ts` dan `src/i18n/request.ts`
});

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
    ...(isProduction && {
      removeConsole: {
        exclude: ["error"],
      },
    }),
  },
  devIndicators: {
    position: "bottom-right",
  },
};

export default withNextIntl(nextConfig);
