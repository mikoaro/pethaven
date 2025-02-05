"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import {
  Bell,
  Coins,
  Contact,
  Dog,
  Grid2x2PlusIcon,
  HomeIcon,
  LineChart,
  ShoppingCart,
  User,
  Users,
  Users2,
} from "lucide-react";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <Grid2x2PlusIcon className="h-4 w-4" />,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    label: "Adopters",
    href: "/admin/adopters",
    icon: <Users2 className="h-4 w-4" />,
  },
  {
    label: "Donors",
    href: "/admin/donors",
    icon: <User className="h-4 w-4" />,
  },
  {
    label: "Donations",
    href: "/admin/donations",
    icon: <Coins className="h-4 w-4" />,
  },
  {
    label: "Pets",
    href: "/admin/pets",
    icon: <Dog className="h-4 w-4" />,
  },
  // {
  //   label: "Users",
  //   href: "/admin/users",
  //   icon: <Users className="h-4 w-4" />,
  // },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: <LineChart className="h-4 w-4" />,
  },
  {
    label: "Contacts",
    href: "/admin/contacts",
    icon: <Contact className="h-4 w-4" />,
  },
  {
    label: "Guardianships",
    href: "/admin/guardianships",
    icon: <HomeIcon className="h-4 w-4" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r bg-gray-50 md:block fixed top-0 left-0 bottom-0 z-20 w-80">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
          
         <Image src="/PetCRM_logo.png" alt="logo" width={180} height={50} />
       
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((navItem) => (
              <Link
                key={navItem.label}
                href={navItem.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname === navItem.href ? "bg-blue-500 text-white" : ""
                }`}
              >
                {navItem.icon}
                {navItem.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </aside>
  );
}
