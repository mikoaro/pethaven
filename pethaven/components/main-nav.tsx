"use client";

import * as React from "react";
import Link from "next/link";
import { Cat } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const adoptItems = [
  {
    title: "Available Pets",
    href: "/adopt/available",
    description: "View all pets currently available for adoption",
  },
  {
    title: "Adoption Process",
    href: "/adopt/process",
    description: "Learn about our adoption requirements and procedures",
  },
  {
    title: "Success Stories",
    href: "/adopt/stories",
    description: "Read about happy endings and successful adoptions",
  },
];

const involvedItems = [
  {
    title: "Volunteer",
    href: "/involved/volunteer",
    description: "Join our team of dedicated volunteers",
  },
  {
    title: "Foster",
    href: "/involved/foster",
    description: "Provide temporary care for animals in need",
  },
  {
    title: "Donate",
    href: "/involved/donate",
    description: "Support our mission through donations",
  },
];

export function MainNav() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex flex-col">
            <span className="text-xs uppercase text-muted-foreground">
              Non-Profit Organization
            </span>
            <span className="font-semibold">Animal Refuge Kansai</span>
            <span className="text-xs text-muted-foreground">
              認定特定非営利活動法人アニマルレフュージ関西
            </span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50">
                    What is ARK?
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Adopt</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {adoptItems.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {item.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Get Involved</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {involvedItems.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {item.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/news" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50">
                    News
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Link
              href="/jp"
              className="text-sm text-muted-foreground hover:text-gray-900"
            >
              日本語
            </Link>
            <Link
              href="/shop"
              className="text-sm text-muted-foreground hover:text-gray-900"
            >
              ARK SHOPPING
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-gray-900"
            >
              CONTACT
            </Link>
          </div>
          <Button className="flex items-center gap-2">
            <Cat className="h-4 w-4" />
            Donate
          </Button>
        </div>
      </div>
    </header>
  );
}
