"use client";

import { IconChartBar, IconInnerShadowTop } from "@tabler/icons-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { LayoutTemplate } from "lucide-react";
import Link from "next/link";
import { NavSide } from "./nav-side";
import Image from "next/image";
import { Logo } from "@/public/assets/assets";

export function AppSidebar({ ...props }) {
  const { user } = useAuth();
  const userRole = user?.role;

  const navUser = {
    name: user?.name,
    email: user?.email,
    avatar: "/avatars/shadcn.jpg",
  };
  const data = {
    navSide: [
      ...(userRole === "admin"
        ? [
            {
              title: "User",
              url: "#",
              icon: IconChartBar,
              isActive: true,
              items: [
                {
                  title: "All User",
                  url: "/dashboard/users",
                }
              ],
            },
          ]
        : []),
      {
        title: "Events",
        url: "#",
        icon: IconChartBar,
        isActive: true,
        items: [
          {
            title: "All Events",
            url: "/dashboard/events",
          },
          ...(userRole === "eventCreator"
            ? [
                {
                  title: "Participants",
                  url: "/dashboard/participants",
                },
              ]
            : []),
          ...(userRole === "admin"
            ? [
                {
                  title: "Event Tickets",
                  url: "/dashboard/tickets",
                },
              ]
            : []),
          {
            title: "Registration Events",
            url: "/dashboard/registration",
          },
        ],
      },
      ...(userRole === "admin"
        ? [
            {
              title: "Layout",
              url: "#",
              icon: LayoutTemplate,
              isActive: true,
              items: [
                {
                  title: "All Logo",
                  url: "/dashboard/logo",
                },
                {
                  title: "All Hero",
                  url: "/dashboard/hero",
                },
                {
                  title: "All Brand",
                  url: "/dashboard/brand",
                },
              ],
            },
          ]
        : []),
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <Image
                  src={Logo}
                  width={150}
                  height={150}
                  alt="Logo"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSide items={data?.navSide} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
