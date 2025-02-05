import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HomeHeader from "@/components/home-header";
import { HeroCarousel } from "@/components/hero-carousel";
import { ServicesSection } from "@/components/services-section";
import { AvailablePets } from "@/components/available-pets";

export default function HomePage() {
  return (
    <section className="flex flex-col min-h-screen  bg-[#fff3d4]">
      <HomeHeader />
      <main className="py-20">
        <HeroCarousel />
        {/* <NewsSection /> */}
        <ServicesSection />
        <AvailablePets />

        <section className="py-16 bg-gray-50 flex justify-center mx-auto text-center gap-5">
          <div className="">
            <div className="">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  PetHaven App
                </h2>
                <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Rutrum sodales vitae interdum commodo porta penatibus. Ad elit sagittis sodales fames lacinia id litora quis sagittis.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 flex justify-center lg:justify-center">
                <a href="" target="_blank">
                  <Button className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-xl px-12 py-6 inline-flex items-center justify-center mt-10">
                    View the code
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}
