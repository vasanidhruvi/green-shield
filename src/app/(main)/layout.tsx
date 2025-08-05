"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Recycle, Sparkles, Trophy, Users, Leaf, Award, PlusCircle, ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"


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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { User, LogOut } from "lucide-react"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", subItems: [
      { href: "/log-activity", icon: PlusCircle, label: "Log Activity" },
  ] },
  { href: "/challenges", icon: Trophy, label: "Challenges" },
  { href: "/green-credits", icon: Award, label: "Green Credits" },
  { href: "/offsets", icon: Recycle, label: "Offsets" },
  { href: "/eco-tips", icon: Sparkles, label: "Eco Tips" },
  { href: "/community", icon: Users, label: "Community" },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = React.useState<Record<string, boolean>>({
      "/dashboard": pathname.startsWith('/dashboard') || pathname.startsWith('/log-activity')
  });

  const toggleSubmenu = (href: string) => {
    setOpenSubmenus(prev => ({ ...prev, [href]: !prev[href] }));
  };

  React.useEffect(() => {
    // If the pathname changes, make sure the correct submenu is open
    const currentParent = navItems.find(item => item.subItems?.some(sub => pathname.startsWith(sub.href)));
    if (currentParent) {
        setOpenSubmenus(prev => ({...prev, [currentParent.href]: true}));
    }
  }, [pathname]);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <div className="group-data-[collapsible=icon]:hidden">
                <Logo />
            </div>
            <div className="hidden group-data-[collapsible=icon]:block">
              <Leaf className="h-6 w-6 text-primary"/>
            </div>
            <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                 {item.subItems ? (
                    <>
                        <SidebarMenuButton
                            onClick={() => toggleSubmenu(item.href)}
                            isActive={pathname.startsWith(item.href)}
                            tooltip={item.label}
                        >
                            <item.icon />
                            <span>{item.label}</span>
                            <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", openSubmenus[item.href] && "rotate-180")}/>
                        </SidebarMenuButton>
                        <AnimatePresence>
                        {openSubmenus[item.href] && (
                             <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                style={{ overflow: 'hidden' }}
                             >
                                <SidebarMenuSub>
                                {item.subItems.map((subItem) => (
                                    <SidebarMenuSubItem key={subItem.href}>
                                        <Link href={subItem.href}>
                                            <SidebarMenuSubButton
                                                isActive={pathname.startsWith(subItem.href)}
                                            >
                                                <subItem.icon />
                                                <span>{subItem.label}</span>
                                            </SidebarMenuSubButton>
                                        </Link>
                                    </SidebarMenuSubItem>
                                ))}
                                </SidebarMenuSub>
                             </motion.div>
                        )}
                        </AnimatePresence>
                    </>
                 ) : (
                    <Link href={item.href}>
                        <SidebarMenuButton
                            isActive={pathname.startsWith(item.href)}
                            tooltip={item.label}
                        >
                            <item.icon />
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                    </Link>
                 )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <Popover>
            <PopoverTrigger asChild>
               <div className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-sidebar-accent">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/100x100" alt="@shadcn" data-ai-hint="people portrait"/>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-semibold">User</span>
                    <span className="text-xs text-muted-foreground">user@example.com</span>
                  </div>
               </div>
             </PopoverTrigger>
             <PopoverContent className="w-56 p-2">
                <div className="flex flex-col gap-1">
                  <Link href="/profile">
                    <Button variant="ghost" className="w-full justify-start">
                        <User className="mr-2"/> Profile
                    </Button>
                  </Link>
                  <Separator />
                   <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600">
                        <LogOut className="mr-2"/> Sign Out
                    </Button>
                </div>
             </PopoverContent>
           </Popover>
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
