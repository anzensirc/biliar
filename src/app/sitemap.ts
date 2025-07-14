import { MetadataRoute } from "next";
import { isI18nEnabled } from "@/i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  return [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      priority: 1,
      ...(isI18nEnabled
        ? {
            alternates: {
              languages: {
                id: `${BASE_URL}/id`,
                en: `${BASE_URL}/en`,
              },
            },
          }
        : {}),
    },
  ];
}
