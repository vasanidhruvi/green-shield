'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { Pie, PieChart, Legend } from 'recharts'
import { Leaf, Droplets, Zap, ShieldCheck, Plus, TreePine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import React from 'react'
import { cn } from '@/lib/utils'
import { InteractiveCard } from '@/components/ui/interactive-card'

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

      <div className="grid gap-6 lg:grid-cols-3" style={{ perspective: '1500px' }}>
        {/* Main Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           <InteractiveCard>
            <Card className="bg-primary/5 border-primary/20 backdrop-blur-sm">
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
                        <div className="p-4 rounded-lg bg-background/70">
                             <Leaf className="h-6 w-6 text-primary mx-auto mb-2" />
                             <p className="text-2xl font-bold">{totalFootprint} kg</p>
                             <p className="text-xs text-muted-foreground">This Month's CO₂e</p>
                        </div>
                        <div className="p-4 rounded-lg bg-background/70">
                             <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                             <p className="text-2xl font-bold">50 kg</p>
                             <p className="text-xs text-muted-foreground">Offsets Purchased</p>
                        </div>
                        <div className="p-4 rounded-lg bg-background/70">
                             <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                             <p className="text-2xl font-bold">12 Days</p>
                             <p className="text-xs text-muted-foreground">Challenge Streak</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
           </InteractiveCard>
           
            <InteractiveCard>
                <Card className="backdrop-blur-sm">
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
                                transform: `scale(${0.8 + (treeGrowth/100 * 0.2)})`,
                                filter: `drop-shadow(0 0 15px hsl(var(--primary)))`
                            }}/>
                        </div>
                        <div className="flex-1 w-full">
                            <p className="font-semibold mb-1">Tree Growth</p>
                            <Progress value={treeGrowth} className="w-full h-3" />
                            <p className="text-sm text-muted-foreground mt-2">{treeGrowth.toFixed(0)}% to next level. Keep up the great work!</p>
                        </div>
                    </CardContent>
                </Card>
            </InteractiveCard>

        </div>

        {/* Side Column */}
        <div className="row-start-1 lg:row-start-auto flex flex-col gap-6">
            <InteractiveCard className="flex-1 flex flex-col">
                <Card className="flex-1 flex flex-col backdrop-blur-sm">
                    <CardHeader className="items-center pb-0">
                        <CardTitle className="text-base font-headline">Footprint Breakdown</CardTitle>
                        <CardDescription>Your CO₂e by category</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-center justify-center pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square h-full w-full"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel nameKey="category" />}
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="category"
                                    innerRadius={60}
                                    strokeWidth={5}
                                    activeIndex={0}
                                    activeShape={({ outerRadius = 0, ...props }) => (
                                        <g>
                                            <title>{props.payload.category}</title>
                                            <path d={props.d} fill={props.fill} stroke={props.stroke} />
                                            <path
                                                d={`M${props.cx},${props.cy}L${props.mx},${props.my}L${props.lx},${props.ly}Z`}
                                                fill="hsla(var(--primary), 0.5)"
                                                stroke="hsl(var(--primary))"
                                            />
                                            <circle cx={props.cx} cy={props.cy} r="40" fill="hsl(var(--background))" />
                                            <text
                                                x={props.cx}
                                                y={props.cy}
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                className="fill-foreground text-2xl font-bold"
                                            >
                                                {props.payload.value}
                                            </text>
                                            <text
                                                x={props.cx}
                                                y={props.cy + 18}
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                className="fill-muted-foreground text-sm"
                                            >
                                                kg CO₂e
                                            </text>
                                        </g>
                                    )}
                                />
                                <Legend
                                    content={({ payload }) => {
                                        return (
                                            <ul className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-sm text-muted-foreground">
                                                {payload?.map((entry) => (
                                                    <li key={`item-${entry.value}`} className="flex items-center gap-1.5">
                                                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                                        {entry.payload.category}
                                                    </li>
                                                ))}
                                            </ul>
                                        )
                                    }}
                                />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </InteractiveCard>
            <InteractiveCard>
                <Card className="backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="font-headline">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <Button variant="outline" className="justify-start"><Plus className="mr-2"/> Log a new activity</Button>
                        <Button variant="outline" className="justify-start"><Zap className="mr-2"/> Start a new challenge</Button>
                        <Button variant="outline" className="justify-start"><Droplets className="mr-2"/> Purchase offsets</Button>
                    </CardContent>
                </Card>
            </InteractiveCard>
        </div>
      </div>
    </div>
  )
}
