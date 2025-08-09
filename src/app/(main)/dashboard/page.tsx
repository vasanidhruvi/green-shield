
'use client'

import * as React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Car,
  Beef,
  Home,
  ShoppingBag,
  Leaf,
  Droplets,
  Zap,
  ShieldCheck,
  Plus,
  TreePine,
  ArrowRight,
  Award,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const footprintCategories = [
  { category: 'Transport', color: 'hsl(var(--chart-1))', icon: Car },
  { category: 'Energy', color: 'hsl(var(--chart-2))', icon: Home },
  { category: 'Food', color: 'hsl(var(--chart-3))', icon: Beef },
  { category: 'Goods', color: 'hsl(var(--chart-4))', icon: ShoppingBag },
];

export default function DashboardPage() {
  const [footprintData, setFootprintData] = React.useState<any[]>([]);
  const [totalFootprint, setTotalFootprint] = React.useState(0);
  const [offsets, setOffsets] = React.useState(0);
  const [challengeStreak, setChallengeStreak] = React.useState(0);
  const [greenCredits, setGreenCredits] = React.useState(0);

  React.useEffect(() => {
    // Generate random data on the client side to avoid hydration mismatch
    const randomData = footprintCategories.map(item => ({
      ...item,
      value: Math.floor(Math.random() * 200) + 50,
    }));
    const total = randomData.reduce((acc, curr) => acc + curr.value, 0);
    
    setFootprintData(randomData);
    setTotalFootprint(total);
    setOffsets(Math.floor(Math.random() * 100) + 20);
    setChallengeStreak(Math.floor(Math.random() * 30));
    setGreenCredits(Math.floor(Math.random() * 500) + 50);
  }, []);

  const treeGrowth = Math.min((totalFootprint / 1000) * 100, 100) // Example growth logic

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">
          Welcome back, Eco-Hero!
        </h1>
        <p className="text-muted-foreground">
          See your positive impact and continue your green journey.
        </p>
      </header>

      <Card className="bg-primary/5 border-primary/20 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-10 h-10 text-primary" />
            <div>
              <CardTitle className="font-headline text-primary">
                Your Eco-Hero Status
              </CardTitle>
              <CardDescription>
                Your current stats at a glance.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-lg bg-background/70">
              <Leaf className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{totalFootprint} kg</p>
              <p className="text-xs text-muted-foreground">
                This Month's CO₂e
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background/70">
              <Award className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{greenCredits}</p>
              <p className="text-xs text-muted-foreground">
                Green Credits
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background/70">
              <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{offsets} kg</p>
              <p className="text-xs text-muted-foreground">
                Offsets Purchased
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background/70">
              <Zap className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{challengeStreak} Days</p>
              <p className="text-xs text-muted-foreground">
                Challenge Streak
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1 flex flex-col backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="text-base font-headline">Footprint Breakdown</CardTitle>
            <CardDescription>Your CO₂e by category</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
            {footprintData.map((item) => (
                <div key={item.category} className="group flex items-center gap-3">
                    <div className="p-2 rounded-md bg-accent/50">
                        <item.icon className="w-5 h-5 text-accent-foreground"/>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{item.category}</span>
                            <span className="text-sm font-bold">{item.value} kg</span>
                        </div>
                        <Progress value={totalFootprint > 0 ? (item.value / totalFootprint) * 100 : 0} className="h-1.5 mt-1" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
            ))}
        </CardContent>
          <CardFooter>
              <Button variant="link" size="sm" className="p-0 text-xs">View Detailed Report</Button>
        </CardFooter>
      </Card>
      
      <Card className="backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-headline">Your Eco-Garden</CardTitle>
          <CardDescription>
            Your actions help our planet flourish. Watch your tree grow!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <TreePine
              className="w-24 h-24 text-primary transition-all duration-1000"
              style={{
                opacity: 0.3 + (treeGrowth / 100) * 0.7,
                transform: `scale(${0.8 + (treeGrowth / 100) * 0.2})`,
                filter: `drop-shadow(0 0 15px hsl(var(--primary)))`,
              }}
            />
          </div>
          <div className="flex-1 w-full">
            <p className="font-semibold mb-1">Tree Growth</p>
            <Progress value={treeGrowth} className="w-full h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              {treeGrowth.toFixed(0)}% to next level. Keep up the great
              work!
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-headline">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-3 gap-3">
            <Button asChild variant="outline" className="justify-start">
            <Link href="/log-activity">
              <Plus className="mr-2" /> Log an activity
            </Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link href="/challenges">
              <Zap className="mr-2" /> Start a new challenge
            </Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link href="/offsets">
              <Droplets className="mr-2" /> Purchase offsets
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
