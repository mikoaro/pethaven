import { Avatar } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 1 }).map((_, i) => (
        <div key={i} className="flex items-center">
          <Avatar className="h-9 w-9">
            <div className="bg-primary/10 flex h-full w-full items-center justify-center rounded-full">A</div>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Sophia Falcon</p>
            <p className="text-sm text-muted-foreground">sophiafalcon@gmail.com</p>
          </div>
          <div className="ml-auto font-medium">+$0</div>
        </div>
      ))}
    </div>
  )
}

