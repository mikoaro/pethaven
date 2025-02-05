import Link from "next/link";
import { Sun, Moon, CircleUser } from "lucide-react";
import { Input } from "./ui/input";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import Image from "next/image";

export default function HomeHeader() {
  return (
    <header className="border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex gap-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/PetHaven_logo.png"
              alt="logo"
              width={180}
              height={50}
            />
          </Link>
          <Link href="/app/pets/pets-list">
            {/* <Link href="/app"> */}
            <h1 className="mt-3">Try App</h1>
          </Link>
          <Link href="/">
            <h1 className="mt-3">How it works</h1>
          </Link>
          <Link href="/app">
            <h1 className="mt-3">Documentation</h1>
          </Link>
          <Link href="/app">
            <h1 className="mt-3">GitHub</h1>
          </Link>
        </div>
        <div className="relative flex gap-5">
          <Input
            type="text"
            placeholder="Search documentation..."
            className="w-full border rounded-lg p-2 text-sm"
          />
          <Button variant="ghost" className="hover:bg-slate-100 w-5">
            <Avatar className="h-5 w-5">
              <AvatarImage src="/github.png" alt="social-icon" />
            </Avatar>
          </Button>

          <Button variant="ghost" className="hover:bg-slate-100 w-5">
            <Avatar className="h-5 w-5">
              <AvatarImage src="/x-social.png" alt="x-social" />
            </Avatar>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="hover:bg-slate-100 w-5 shadow-none border-none"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Light</DropdownMenuItem>
              <DropdownMenuItem>Dark</DropdownMenuItem>
              <DropdownMenuItem>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="hover:bg-slate-100 w-5 shadow-none border-none"
              >
                <CircleUser className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
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
        </div>
      </div>
    </header>
  );
}
