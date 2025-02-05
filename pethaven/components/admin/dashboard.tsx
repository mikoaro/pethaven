import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart } from "@/components/admin/line-chart"
import { RecentSales } from "@/components/admin/recent-sales"
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen flex-col py-10">
        <h1 className="text-3xl font-bold px-8">Dashboard</h1>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 h-40 mb-10">
          <Card className="border-none shadow-lg hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 gap-5">
              <CardTitle className="text-3xl font-bold text-green-600">Total Revenue</CardTitle>
              <DollarSign className="h-8 w-8 text-muted-foreground text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$200.00</div>
              <p className="text-lg text-muted-foreground">Based on 0 Charges</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between gap-5 pb-2">
              <CardTitle className="text-3xl font-bold text-blue-700">Total Sales</CardTitle>
              <ShoppingCart className="h-8 w-8 text-muted-foreground text-blue-700" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">+0</div>
              <p className="text-lg text-muted-foreground">Total Sales on PetHaven</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between gap-5 pb-2">
              <CardTitle className="text-3xl font-bold text-purple-700">Total Pets</CardTitle>
              <Package className="h-8 w-8 text-muted-foreground text-purple-700" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">7</div>
              <p className="text-lg text-muted-foreground">Total Pets added</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between gap-5 pb-2">
              <CardTitle className="text-3xl font-bold text-orange-600">Total Users</CardTitle>
              <Users className="h-8 w-8 text-muted-foreground text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">1</div>
              <p className="text-lg text-muted-foreground">Total Users Signed Up</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <p className="text-sm text-muted-foreground">Recent transactions from the last 7 days</p>
            </CardHeader>
            <CardContent>
              <LineChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent sales</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

