"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/types";

export function NavItems({
  items,
  userRoles = [],
  isLoading,
}: {
  items: NavItem[];
  userRoles?: string[]; // Current user's roles
  isLoading?: boolean;
}) {
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  // Filter items based on user roles
  const authorizedItems = items.filter((item) => {
    // If no roles specified, everyone can access
    if (!item.roles || item.roles.length === 0) return true;
    // Check if user has at least one of the required roles
    return item.roles.some((role) => userRoles.includes(role));
  });

  if (isLoading || !authorizedItems) {
    return (
      <SidebarGroup>
        <SidebarMenu>
          {[...Array(4)].map((_, idx) => (
            <SidebarMenuItem key={idx}>
              <SidebarMenuButton className="animate-pulse">
                <div className="w-5 h-5 bg-muted rounded" />
                <div className="h-3 w-20 bg-muted rounded ml-2" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {authorizedItems.map((item) => {
          const hasSubItems = item.items && item.items.length > 0;
          const normalizedUrl = item.url.startsWith("/")
            ? item.url
            : `/${item.url}`;
          const isSubRouteActive = (pathname: string, base: string) => {
            return pathname === base || pathname.startsWith(base + "/");
          };
          const isActive =
            isSubRouteActive(pathname, normalizedUrl) ||
            (item.items?.some((sub) => isSubRouteActive(pathname, sub.url)) ??
              false);

          // Filter subItems based on user roles
          const authorizedSubItems = item.items?.filter((subItem) => {
            if (!subItem.roles || subItem.roles.length === 0) return true;
            return subItem.roles.some((role) => userRoles.includes(role));
          });

          // Check if this user role should see this item as a direct link
          // without showing subitems, even if subitems exist
          const shouldRenderDirectLink = item.directLinkRoles?.some((role) =>
            userRoles.includes(role)
          );

          // If no authorized subitems and this item had subitems, don't render
          // UNLESS the item is configured to be a direct link for this role
          if (
            hasSubItems &&
            (!authorizedSubItems || authorizedSubItems.length === 0) &&
            !shouldRenderDirectLink
          ) {
            return null;
          }

          // For items without subitems OR items that should be direct links for this role
          if (!hasSubItems || shouldRenderDirectLink) {
            return (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url} passHref>
                  <SidebarMenuButton
                    className={`hover:!bg-primary hover:!text-white ${
                      isActive ? "text-primary font-medium" : ""
                    }`}
                    tooltip={item.title}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          }

          // For items with subitems, render a collapsible menu
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={`hover:!bg-primary hover:!text-white ${
                      isActive ? "text-primary" : ""
                    }`}
                    tooltip={item.title}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="pl-1 ml-0">
                    {authorizedSubItems?.map((subItem) => {
                      const isSubActive = isSubRouteActive(
                        pathname,
                        subItem.url
                      );
                      return (
                        <SidebarMenuSubItem key={subItem.title} className="">
                          <Link href={subItem.url}>
                            <SidebarMenuSubButton
                              asChild
                              className={`hover:bg-primary hover:text-white pl-2 group/sub ${
                                isSubActive ? "font-medium text-primary" : ""
                              }`}
                            >
                              <div className="flex gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full group-hover/sub:bg-white" />

                                <span>{subItem.title}</span>
                              </div>
                            </SidebarMenuSubButton>
                          </Link>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
