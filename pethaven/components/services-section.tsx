import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PawPrintIcon as Paw,
  Stethoscope,
  Scissors,
  MapPin,
  Heart,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Paw,
    title: "Pet Adoption",
    description:
      "Rutrum sodales vitae interdum commodo porta penatibus. Ad elit sagittis sodales fames lacinia id litora quis sagittis.",
    highlighted: true,
  },
  {
    icon: Stethoscope,
    title: "Veterinary Care",
    description:
      "Rutrum sodales vitae interdum commodo porta penatibus. Ad elit sagittis sodales fames lacinia id litora quis sagittis.",
    highlighted: false,
  },
  {
    icon: Scissors,
    title: "Pet Grooming",
    description:
      "Rutrum sodales vitae interdum commodo porta penatibus. Ad elit sagittis sodales fames lacinia id litora quis sagittis.",
    highlighted: false,
  },
  {
    icon: MapPin,
    title: "Lost and Found",
    description:
      "Rutrum sodales vitae interdum commodo porta penatibus. Ad elit sagittis sodales fames lacinia id litora quis sagittis.",
    highlighted: false,
  },
  {
    icon: Heart,
    title: "Pet Donations",
    description:
      "Rutrum sodales vitae interdum commodo porta penatibus. Ad elit sagittis sodales fames lacinia id litora quis sagittis.",
    highlighted: false,
  },
  {
    icon: Sparkles,
    title: "Animal Training",
    description:
      "Rutrum sodales vitae interdum commodo porta penatibus. Ad elit sagittis sodales fames lacinia id litora quis sagittis.",
    highlighted: false,
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sm text-blue-600 uppercase tracking-wider">
            What we offer
          </span>
          <h2 className="text-3xl font-bold mt-2">
            We provide a way for you to give back
            <br />
            to animals in need
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className={cn(
                "flex flex-col items-center text-center p-16 outline-white rounded-md border-white shadow-xl hover:mb-1",
                service.highlighted ? "bg-[#B8C4E9]" : "bg-gray-50"
              )}
            >
              <div className="w-12 h-12 rounded bg-[#F28B82] flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Button className="bg-[#F5BA41] hover:bg-[#e5ad3c] text-black mt-auto w-full">
                Learn More
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
