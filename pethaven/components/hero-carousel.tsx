"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    title: "ARK 2025 Original Calendars",
    image:
      "/heroImage.jpg",
    buttonText: "Click for Details",
    price: "¥1,000",
    type: "desk",
  },
  // {
  //   id: 2,
  //   title: "ARK 2025 Wall Calendar",
  //   image:
  //     "https://sjc.microlink.io/lSi1yh__kMDNuebZJujYyM2XH54yQOVmIoJO7OhAid8AWlMe57ODDJbOQtOpd9XZ66hCYNxymN2aWylvKCvTbg.jpeg",
  //   buttonText: "Click for Details",
  //   price: "¥1,200",
  //   type: "wall",
  // },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // const goToSlide = (index: number) => {
  //   setCurrentSlide(index)
  // }

  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto px-6 pb-20 pt-10 items-center max-w-7xl">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Card */}
          <Card className="bg-white p-8 flex flex-col items-left justify-center text-left h-[300px] mt-32 rounded-r-none rounded-l-2xl border-none shadow-none">
            <h2 className="text-5xl font-semibold mb-6">PetHaven 2025 Original Calendars</h2>
            <Button className="bg-black text-white hover:bg-[#F5BA41] rounded-full w-1/2">Click for Details</Button>
          </Card>

          {/* Right Card */}
          <Card className="bg-white w-full border-none shadow-none mt-10 p-2 rounded-2xl">
            <div className="rounded-2xl">
              <Image
                src={slides[currentSlide].image || "/placeholder.svg"}
                alt="Calendar preview"
                height={900}
                width={700}
                className="object-contain rounded-2xl"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

