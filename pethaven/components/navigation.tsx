import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navigation() {
  return (
    <header className="bg-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/placeholder.svg"
              alt="ARK Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-sm font-medium">ANIMAL REFUGE KANSAI</span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>What is ARK?</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[200px]">
                    <Link
                      href="/about"
                      className="block p-2 hover:bg-gray-100 rounded-md"
                    >
                      About Us
                    </Link>
                    <Link
                      href="/mission"
                      className="block p-2 hover:bg-gray-100 rounded-md"
                    >
                      Our Mission
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Adopt</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[200px]">
                    <Link
                      href="/dogs"
                      className="block p-2 hover:bg-gray-100 rounded-md"
                    >
                      Dogs
                    </Link>
                    <Link
                      href="/cats"
                      className="block p-2 hover:bg-gray-100 rounded-md"
                    >
                      Cats
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Get Involved</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[200px]">
                    <Link
                      href="/volunteer"
                      className="block p-2 hover:bg-gray-100 rounded-md"
                    >
                      Volunteer
                    </Link>
                    <Link
                      href="/donate"
                      className="block p-2 hover:bg-gray-100 rounded-md"
                    >
                      Donate
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/news" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium">
                    News
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              日本語
            </Button>
            <Button variant="outline" size="sm">
              ARK SHOPPING
            </Button>
            <Button variant="outline" size="sm">
              CONTACT
            </Button>
            <Button className="bg-[#ffd233] text-black hover:bg-[#e6bd2e]">
              Donate
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
