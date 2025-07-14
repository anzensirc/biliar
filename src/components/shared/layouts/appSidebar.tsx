"use client";

import type * as React from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import AppSidebarHeader from "./appSidebarHeader";
import { NavItems } from "./navItems";
import { getNavData } from "@/constants";

// Menu items
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navData = getNavData();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-0 sticky">
        <AppSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        {navData && <NavItems items={navData.navItems} userRoles={["admin"]} />}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
