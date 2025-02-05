import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const newsItems = [
  {
    id: 1,
    image: "/placeholder.svg",
    title: "Tokuyama ARK Day Service",
    date: "2025.1",
  },
  {
    id: 2,
    image: "/placeholder.svg",
    title: "Volunteer Applications Open",
    date: "2023.12",
  },
  {
    id: 3,
    image: "/placeholder.svg",
    title: "Children's Visit to ARK",
    date: "2023.12",
  },
  {
    id: 4,
    image: "/placeholder.svg",
    title: "Volunteer Recruitment Notice",
    date: "2025.1",
  },
]

export function NewsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">News</h2>
          <Button variant="outline" className="rounded-full">
            View more
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative aspect-video">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-2">{item.date}</p>
                <h3 className="font-medium">{item.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

