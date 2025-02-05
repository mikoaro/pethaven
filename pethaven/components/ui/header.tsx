import React from "react";
import MobileNav from "./mobile-nav";
import { CircleUser, Search } from "lucide-react";
import { Input } from "./input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-gray-50 px-4 lg:h-[60px] lg:px-6 fixed top-0 right-0 left-[310px] z-10">
      <MobileNav />
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search animals..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/app/pets/pets-list">
          <DropdownMenuItem>User Dashboard</DropdownMenuItem>
          </Link>
          <Link href="/admin">
          <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
