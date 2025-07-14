"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { isI18nEnabled, routing } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LanguagesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function LangSwitcher() {
  const _isI18nEnabled = isI18nEnabled;
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale(); // ✅ Ambil locale aktif
  const t = useTranslations("lang");

  function switchLocale(newLocale: string) {
    if (!pathname) return;

    const pathWithoutLocale = (() => {
      const parts = pathname.split("/");
      const getLang: any = parts[1];
      if (routing.locales.includes(getLang)) {
        return "/" + parts.slice(2).join("/");
      }
      return pathname;
    })();

    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  }

  if (!_isI18nEnabled) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="bg-emerald-500 hover:bg-emerald-600"
        >
          <LanguagesIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            className={cn(
              "uppercase",
              currentLocale === locale &&
                "bg-emerald-500 focus:bg-emerald-600 text-white focus:text-white"
            )}
            onClick={() => switchLocale(locale)}
          >
            {t(locale)}{" "}
            {/* ✅ Akan mengambil label dari `lang.en` / `lang.id` */}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
