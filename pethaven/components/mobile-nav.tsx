"use client";

import * as React from "react";
import Link from "next/link";
import { Cat, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="what-is-ark">
              <Link href="/about" onClick={() => setOpen(false)}>
                <AccordionTrigger>What is ARK?</AccordionTrigger>
              </Link>
            </AccordionItem>
            <AccordionItem value="adopt">
              <AccordionTrigger>Adopt</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/adopt/available"
                    className="px-4 py-2 hover:bg-accent"
                    onClick={() => setOpen(false)}
                  >
                    Available Pets
                  </Link>
                  <Link
                    href="/adopt/process"
                    className="px-4 py-2 hover:bg-accent"
                    onClick={() => setOpen(false)}
                  >
                    Adoption Process
                  </Link>
                  <Link
                    href="/adopt/stories"
                    className="px-4 py-2 hover:bg-accent"
                    onClick={() => setOpen(false)}
                  >
                    Success Stories
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="get-involved">
              <AccordionTrigger>Get Involved</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/involved/volunteer"
                    className="px-4 py-2 hover:bg-accent"
                    onClick={() => setOpen(false)}
                  >
                    Volunteer
                  </Link>
                  <Link
                    href="/involved/foster"
                    className="px-4 py-2 hover:bg-accent"
                    onClick={() => setOpen(false)}
                  >
                    Foster
                  </Link>
                  <Link
                    href="/involved/donate"
                    className="px-4 py-2 hover:bg-accent"
                    onClick={() => setOpen(false)}
                  >
                    Donate
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="news">
              <Link href="/news" onClick={() => setOpen(false)}>
                <AccordionTrigger>News</AccordionTrigger>
              </Link>
            </AccordionItem>
          </Accordion>
          <div className="flex flex-col gap-2 border-t pt-4">
            <Link
              href="/jp"
              className="px-4 py-2 text-sm text-muted-foreground hover:text-gray-900"
              onClick={() => setOpen(false)}
            >
              日本語
            </Link>
            <Link
              href="/shop"
              className="px-4 py-2 text-sm text-muted-foreground hover:text-gray-900"
              onClick={() => setOpen(false)}
            >
              ARK SHOPPING
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 text-sm text-muted-foreground hover:text-gray-900"
              onClick={() => setOpen(false)}
            >
              CONTACT
            </Link>
          </div>
          <Button className="mt-4 flex items-center gap-2">
            <Cat className="h-4 w-4" />
            Donate
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
