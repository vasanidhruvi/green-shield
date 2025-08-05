'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts'
import { Leaf, Droplets, Zap, ShoppingBag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const chartData = [
  { month: 'Jan', transport: 186, energy: 80, food: 120, goods: 90 },
  { month: 'Feb', transport: 205, energy: 95, food: 110, goods: 100 },
  { month: 'Mar', transport: 237, energy: 100, food: 130, goods: 110 },
  { month: 'Apr', transport: 173, energy: 110, food: 140, goods: 120 },
  { month: 'May', transport: 209, energy: 120, food: 150, goods: 130 },
  { month: 'Jun', transport: 214, energy: 130, food: 160, goods: 140 },
]

const chartConfig = {
  transport: { label: 'Transport', color: 'hsl(var(--chart-1))' },
  energy: { label: 'Energy', color: 'hsl(var(--chart-2))' },
  food: { label: 'Food', color: 'hsl(var(--chart-3))' },
  goods: { label: 'Goods', color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Your personal carbon footprint at a glance.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month's Footprint</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">654 kg CO₂e</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offsets Purchased</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground text-accent-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50 kg CO₂e</div>
            <p className="text-xs text-muted-foreground">Equivalent to 2 trees planted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Challenge Streak</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Days</div>
            <p className="text-xs text-muted-foreground">Top 10% of users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Badges</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2</div>
            <div className="flex -space-x-2 overflow-hidden mt-1">
                <Badge variant="secondary">Eco-Warrior</Badge>
                <Badge variant="secondary">Veggie Lover</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Monthly Carbon Footprint Breakdown</CardTitle>
          <CardDescription>Track your emissions across different categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={chartData} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="transport" stackId="a" fill="var(--color-transport)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="energy" stackId="a" fill="var(--color-energy)" />
              <Bar dataKey="food" stackId="a" fill="var(--color-food)" />
              <Bar dataKey="goods" stackId="a" fill="var(--color-goods)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
