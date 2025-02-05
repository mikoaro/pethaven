import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AdoptionHero() {
  return (
    <div>
      <div className="w-full bg-[#fdf6e7] border-b border-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl font-medium">Animals for Adoption</h1>
            <div className="space-y-4">
              <p className="text-lg">
                Start here to find the animal(s) you want to adopt.
              </p>
              <p className="text-lg">
                All dogs and cats are neutered, vaccinated and microchipped on
                intake, unless medical conditions necessitate a period of
                observation before opting for these procedures.
              </p>
            </div>
            <div className="pt-4">
              <Link href="/adopt/process">
                <Button className="bg-black hover:bg-black/90 text-white rounded-full px-8">
                  The Adoption Process
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14">
        <p className="text-lg mb-2">
          Choose the size and sex of the animal if these are factors.
        </p>
        <p className="text-lg mb-4">
          Selecting the geographical area will show which animals are in which
          of the three facilities.
        </p>
      </div>
    </div>
  );
}
