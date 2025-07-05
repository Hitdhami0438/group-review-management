"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PieChart,
  Settings2,
  ShieldUser,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.png",
  },
  // teams: [
  //   {
  //     name: "Acme Inc",
  //     logo: GalleryVerticalEnd,
  //     plan: "Enterprise",
  //   },
  //   {
  //     name: "Acme Corp.",
  //     logo: AudioWaveform,
  //     plan: "Startup",
  //   },
  //   {
  //     name: "Evil Corp.",
  //     logo: Command,
  //     plan: "Free",
  //   },
  // ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Groups",
          url: "/groups",
        },
        {
          title: "Members",
          url: "/members",
        },
      ],
    },
    {
      title: "Group",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Group Task",
          url: "/group-task",
        },
        {
          title: "Group Member",
          url: "/group-members",
        },
        {
          title: "Discusion",
          url: "/group-discussions",
        },
      ],
    },
    {
      title: "Admin",
      url: "#",
      icon: ShieldUser,
      items: [
        {
          title: "Admin Dashboard",
          url: "/admin-dashboard",
        },
        {
          title: "Members",
          url: "/admin-dashboard/members",
        },
        {
          title: "Group",
          url: "/admin-dashboard/groups",
        },
        {
          title: "User Logs",
          url: "/admin-dashboard/users-logs",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "#",
      icon: Frame,
    },
    {
      name: "Group",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}

      <SidebarHeader>
        <div className="flex flex-row items-center gap-2">
          <Link href="/">
            <Image
              src="./chai-mascot.svg"
              width="30"
              height="25"
              alt={"external-N-alphabet-others-inmotus-design-14"}
            />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
