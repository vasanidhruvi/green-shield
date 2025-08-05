"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Recycle, Sparkles, Trophy, Users, Leaf, Award } from "lucide-react"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/challenges", icon: Trophy, label: "Challenges" },
  { href: "/green-credits", icon: Award, label: "Green Credits" },
  { href: "/offsets", icon: Recycle, label: "Offsets" },
  { href: "/eco-tips", icon: Sparkles, label: "Eco Tips" },
  { href: "/community", icon: Users, label: "Community" },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <div className="group-data-[collapsible=icon]:hidden">
                <Logo />
            </div>
            <div className="hidden group-data-[collapsible=icon]:block">
              <Leaf className="h-6 w-6 text-primary icon-3d"/>
            </div>
            <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                  >
                    <item.icon className="icon-3d" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://placehold.co/100x100" alt="@shadcn" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-semibold">User</span>
                <span className="text-xs text-muted-foreground">user@example.com</span>
              </div>
           </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 md:p-6 lg:p-8">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
