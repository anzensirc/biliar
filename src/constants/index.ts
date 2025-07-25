import { NavItem } from "@/types";
import {
  Grid,
  FileText,
  CalendarX,
  Upload,
  DockIcon,
  LayoutDashboard,
  Table2,
  BookOpenCheck,
  ScrollText,
  Target,
  QrCode,
  Settings2,
  Calendar,
} from "lucide-react";
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const REGION_URL = process.env.NEXT_PUBLIC_API_REGION;

type navDateType = {
  navItems: NavItem[];
};

export const getNavData = (): navDateType => {
  return {
    navItems: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        roles: ["admin", "superadmin", "user"],
      },
      // {
      //   title: "Form Input",
      //   url: "/form-input",
      //   icon: DockIcon,
      //   roles: ["superadmin", "admin", "user"],
      //   directLinkRoles: ["user"],
      //   items: [
      //     {
      //       title: "Semua Input",
      //       url: "/form-input/all",
      //       roles: ["superadmin", "admin"],
      //     },
      //     {
      //       title: "Surat",
      //       url: "/form-input/letter",
      //       roles: ["superadmin", "admin"],
      //     },
      //   ],
      // },
      // {
      //   title: "Tables",
      //   url: "/tables",
      //   icon: Table2,
      //   roles: ["superadmin", "admin", "user"],
      //   directLinkRoles: ["user"],
      //   items: [
      //     {
      //       title: "tables admin",
      //       url: "/tables/admin",
      //       roles: ["superadmin", "admin"],
      //     },
      //   ],
      // },
      // Uncomment if you want to add a dashboard link
      {
        title: "Kelola Meja",
        url: "/kelola-meja",
        icon: Target,
        roles: ["admin", "superadmin", "user"],
      },
      {
        title: "Kelola Booking",
        url: "/kelola-booking",
        icon: BookOpenCheck,
        roles: ["admin", "superadmin", "user"],
      },
      {
        title: "Riwayat Transaksi",
        url: "/riwayat-transaksi",
        icon: FileText,
        roles: ["admin", "superadmin", "user"],
      },
      {
        title: "Kelola Baner",
        url: "/kelola-banner",
        icon: Upload,
        roles: ["admin", "superadmin", "user"],
      },
      {
        title: "Kelola Tutup",
        url: "/kelola-tutup",
        icon: CalendarX,
        roles: ["admin", "superadmin", "user"],
      },
      {
        title: "Kelola Jadwal",
        url: "/kelola-jadwal",
        icon: Calendar,
        roles: ["admin", "superadmin", "user"],
      },
      {
        title: "Syarat Ketentuan",
        url: "/syarat-ketentuan",
        icon: ScrollText,
        roles: ["admin", "superadmin", "user"],
      },
      {
        title: "Setting Web",
        url: "/setting-web",
        icon: Settings2,
        roles: ["admin", "superadmin"],
      },
      {
        title: "Kelola Qris",
        url: "/kelola-qris",
        icon: QrCode,
        roles: ["admin", "superadmin"],
      },
      
    ],
  };
};
