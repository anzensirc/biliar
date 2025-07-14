import { defineRouting } from "next-intl/routing";

// ⬇️ tambahkan flag
export const isI18nEnabled = process.env.NEXT_PUBLIC_I18N_ENABLED === "true";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["id", "en"],

  // Used when no locale matches
  defaultLocale: "id",
  //
  localePrefix: {
    mode: isI18nEnabled ? "always" : "never",
  },
});
