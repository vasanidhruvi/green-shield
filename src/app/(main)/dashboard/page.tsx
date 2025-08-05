'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { RadialBar, RadialBarChart, Legend } from 'recharts'
import { Leaf, Droplets, Zap, ShieldCheck, Plus, TreePine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'

const chartData = [
  { category: 'transport', value: 186, fill: 'var(--color-transport)' },
  { category: 'energy', value: 240, fill: 'var(--color-energy)' },
  { category: 'food', value: 90, fill: 'var(--color-food)' },
  { category: 'goods', value: 138, fill: 'var(--color-goods)' },
]

const chartConfig = {
  value: { label: 'CO₂e (kg)' },
  transport: { label: 'Transport', color: 'hsl(var(--chart-1))' },
  energy: { label: 'Energy', color: 'hsl(var(--chart-2))' },
  food: { label: 'Food', color: 'hsl(var(--chart-3))' },
  goods: { label: 'Goods', color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig

export default function DashboardPage() {
  const totalFootprint = chartData.reduce((acc, curr) => acc + curr.value, 0)
  const treeGrowth = Math.min((totalFootprint / 1000) * 100, 100) // Example growth logic

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Welcome back, Eco-Hero!</h1>
        <p className="text-muted-foreground">See your positive impact and continue your green journey.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <ShieldCheck className="w-10 h-10 text-primary"/>
                    <div>
                        <CardTitle className="font-headline text-primary">Your Eco-Hero Status</CardTitle>
                        <CardDescription>Your current stats at a glance.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-lg bg-background">
                         <Leaf className="h-6 w-6 text-primary mx-auto mb-2" />
                         <p className="text-2xl font-bold">{totalFootprint} kg</p>
                         <p className="text-xs text-muted-foreground">This Month's CO₂e</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background">
                         <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                         <p className="text-2xl font-bold">50 kg</p>
                         <p className="text-xs text-muted-foreground">Offsets Purchased</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background">
                         <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                         <p className="text-2xl font-bold">12 Days</p>
                         <p className="text-xs text-muted-foreground">Challenge Streak</p>
                    </div>
                </div>
            </CardContent>
           </Card>
           
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Your Eco-Garden</CardTitle>
              <CardDescription>Your actions help our planet flourish. Watch your tree grow!</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-32 h-32 flex items-center justify-center">
                   <TreePine 
                    className="w-24 h-24 text-primary transition-all duration-1000" 
                    style={{
                        opacity: 0.3 + (treeGrowth/100 * 0.7),
                        transform: `scale(${0.8 + (treeGrowth/100 * 0.2)})`
                    }}/>
                </div>
                <div className="flex-1 w-full">
                    <p className="font-semibold mb-1">Tree Growth</p>
                    <Progress value={treeGrowth} className="w-full h-3" />
                    <p className="text-sm text-muted-foreground mt-2">{treeGrowth.toFixed(0)}% to next level. Keep up the great work!</p>
                </div>
            </CardContent>
           </Card>

        </div>

        {/* Side Column */}
        <div className="row-start-1 lg:row-start-auto flex flex-col gap-6">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-headline">Footprint Breakdown</CardTitle>
               <CardDescription>Your CO₂e by category</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square h-full w-full"
              >
                <RadialBarChart
                  data={chartData}
                  innerRadius="30%"
                  outerRadius="100%"
                  startAngle={90}
                  endAngle={450}
                  barSize={20}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel nameKey="category" />}
                  />
                   <RadialBar dataKey="value" background cornerRadius={5}/>
                   <Legend
                    iconSize={10}
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ fontSize: '0.8rem' }}
                   />
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
              <CardHeader>
                  <CardTitle className="font-headline">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                 <Button variant="outline" className="justify-start"><Plus className="mr-2"/> Log a new activity</Button>
                 <Button variant="outline" className="justify-start"><Zap className="mr-2"/> Start a new challenge</Button>
                 <Button variant="outline" className="justify-start"><Droplets className="mr-2"/> Purchase offsets</Button>
              </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
