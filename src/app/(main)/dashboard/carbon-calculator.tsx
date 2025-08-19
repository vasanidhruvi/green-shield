
'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Car, Home, Flame, Lightbulb, Calculator, RefreshCw, Beef, ShoppingBag } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

// Emission factors (example values in kg CO₂e per unit, based on various sources like EPA, etc.)
// These are simplified for this example. Real-world calculators are much more complex.
const EMISSION_FACTORS = {
  transport: {
    petrolCar: 2.31, // kg CO₂e per liter
    dieselCar: 2.68, // kg CO₂e per liter
    electricCar: 0.233, // kg CO₂e per kWh (grid average)
    bus: 0.105, // kg CO₂e per km
    train: 0.041, // kg CO₂e per km
    motorcycle: 1.8, // kg CO₂e per liter
  },
  energy: {
    electricity: 0.233, // per kWh
    naturalGas: 0.185, // per kWh (1 m³ ≈ 10.55 kWh)
    lpg: 1.51, // per liter
  },
  food: {
    highMeat: 3300 / 12, // kg CO₂e per month
    mediumMeat: 2500 / 12,
    lowMeat: 1900 / 12,
    vegetarian: 1700 / 12,
    vegan: 1500 / 12,
  },
  shopping: {
    // Average kg CO₂e per dollar spent on goods/services
    goods: 0.210, 
    services: 0.130,
  }
}

export function CarbonCalculator() {
  // Transport State
  const [transportMode, setTransportMode] = React.useState('petrolCar')
  const [distance, setDistance] = React.useState('') // km for bus/train
  const [fuelConsumed, setFuelConsumed] = React.useState('') // liters for cars/motorcycles
  const [evKwh, setEvKwh] = React.useState('') // kWh for electric cars

  // Energy State
  const [electricity, setElectricity] = React.useState('')
  const [naturalGas, setNaturalGas] = React.useState('') // in kWh
  const [lpg, setLpg] = React.useState('') // in Liters

  // Food State
  const [diet, setDiet] = React.useState('mediumMeat')

  // Shopping State
  const [goodsSpending, setGoodsSpending] = React.useState('')
  const [servicesSpending, setServicesSpending] = React.useState('')

  // Results State
  const [transportCO2, setTransportCO2] = React.useState(0)
  const [energyCO2, setEnergyCO2] = React.useState(0)
  const [foodCO2, setFoodCO2] = React.useState(0)
  const [shoppingCO2, setShoppingCO2] = React.useState(0)
  const [totalCO2, setTotalCO2] = React.useState(0)

  const handleCalculate = () => {
    let transportEmissions = 0;
    if (['petrolCar', 'dieselCar', 'motorcycle'].includes(transportMode)) {
      transportEmissions = (EMISSION_FACTORS.transport[transportMode as keyof typeof EMISSION_FACTORS.transport] || 0) * Number(fuelConsumed);
    } else if (transportMode === 'electricCar') {
        transportEmissions = (EMISSION_FACTORS.transport.electricCar) * Number(evKwh);
    } else {
        transportEmissions = (EMISSION_FACTORS.transport[transportMode as keyof typeof EMISSION_FACTORS.transport] || 0) * Number(distance);
    }
    setTransportCO2(transportEmissions)

    const energyEmissions = (EMISSION_FACTORS.energy.electricity * Number(electricity)) + (EMISSION_FACTORS.energy.naturalGas * Number(naturalGas)) + (EMISSION_FACTORS.energy.lpg * Number(lpg))
    setEnergyCO2(energyEmissions)
    
    const foodEmissions = EMISSION_FACTORS.food[diet as keyof typeof EMISSION_FACTORS.food] || 0;
    setFoodCO2(foodEmissions);

    const shoppingEmissions = (EMISSION_FACTORS.shopping.goods * Number(goodsSpending)) + (EMISSION_FACTORS.shopping.services * Number(servicesSpending));
    setShoppingCO2(shoppingEmissions);

    setTotalCO2(transportEmissions + energyEmissions + foodEmissions + shoppingEmissions);
  }

  const handleReset = () => {
    setTransportMode('petrolCar');
    setDistance('');
    setFuelConsumed('');
    setEvKwh('');
    setElectricity('');
    setNaturalGas('');
    setLpg('');
    setDiet('mediumMeat');
    setGoodsSpending('');
    setServicesSpending('');
    setTransportCO2(0);
    setEnergyCO2(0);
    setFoodCO2(0);
    setShoppingCO2(0);
    setTotalCO2(0);
  }


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Calculator className="w-6 h-6"/>
            Monthly Carbon Footprint Calculator
        </CardTitle>
        <CardDescription>
          Estimate your CO₂ emissions across different categories to understand your impact.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="transport" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="transport">
                <Car className="mr-2"/> Transport
            </TabsTrigger>
            <TabsTrigger value="energy">
                <Home className="mr-2"/> Energy
            </TabsTrigger>
            <TabsTrigger value="food">
                <Beef className="mr-2"/> Food
            </TabsTrigger>
            <TabsTrigger value="shopping">
                <ShoppingBag className="mr-2"/> Shopping
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transport" className="pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transport-mode">Transport Mode</Label>
                <Select value={transportMode} onValueChange={setTransportMode}>
                  <SelectTrigger id="transport-mode">
                    <SelectValue placeholder="Select your primary transport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrolCar">Petrol Car</SelectItem>
                    <SelectItem value="dieselCar">Diesel Car</SelectItem>
                    <SelectItem value="motorcycle">Motorcycle</SelectItem>
                    <SelectItem value="electricCar">Electric Car</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="train">Train</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               {['petrolCar', 'dieselCar', 'motorcycle'].includes(transportMode) && (
                 <div className="space-y-2">
                    <Label htmlFor="fuel-consumed">Monthly Fuel Consumed (liters)</Label>
                    <Input
                    id="fuel-consumed"
                    type="number"
                    placeholder="e.g., 60"
                    value={fuelConsumed}
                    onChange={(e) => setFuelConsumed(e.target.value)}
                    />
                </div>
              )}
               {transportMode === 'electricCar' && (
                 <div className="space-y-2">
                    <Label htmlFor="ev-kwh">Monthly Electricity Consumed (kWh)</Label>
                    <Input
                    id="ev-kwh"
                    type="number"
                    placeholder="e.g., 150"
                    value={evKwh}
                    onChange={(e) => setEvKwh(e.target.value)}
                    />
                </div>
              )}
               {['bus', 'train'].includes(transportMode) && (
                  <div className="space-y-2">
                    <Label htmlFor="distance">Monthly Distance (km)</Label>
                    <Input
                    id="distance"
                    type="number"
                    placeholder="e.g., 500"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="energy" className="pt-4">
            <div className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="electricity" className="flex items-center gap-1.5"><Lightbulb className="w-4 h-4"/>Monthly Electricity Usage (kWh)</Label>
                <Input
                  id="electricity"
                  type="number"
                  placeholder="e.g., 300"
                  value={electricity}
                  onChange={(e) => setElectricity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gas" className="flex items-center gap-1.5"><Flame className="w-4 h-4"/>Monthly Natural Gas Usage (kWh)</Label>
                <Input
                  id="gas"
                  type="number"
                  placeholder="e.g., 500"
                  value={naturalGas}
                  onChange={(e) => setNaturalGas(e.target.value)}
                />
                 <p className="text-xs text-muted-foreground">1 m³ is approximately 10.55 kWh.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lpg" className="flex items-center gap-1.5"><Flame className="w-4 h-4"/>Monthly LPG Usage (liters)</Label>
                <Input
                  id="lpg"
                  type="number"
                  placeholder="e.g., 10"
                  value={lpg}
                  onChange={(e) => setLpg(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="food" className="pt-4">
             <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="diet">Describe your diet</Label>
                    <Select value={diet} onValueChange={setDiet}>
                        <SelectTrigger id="diet">
                            <SelectValue placeholder="Select your diet type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="highMeat">High Meat (Daily)</SelectItem>
                            <SelectItem value="mediumMeat">Medium Meat (A few times a week)</SelectItem>
                            <SelectItem value="lowMeat">Low Meat (Rarely)</SelectItem>
                            <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                        </SelectContent>
                    </Select>
                     <p className="text-xs text-muted-foreground">Food emissions are complex. This is a simplified estimate based on average diet footprints.</p>
                </div>
            </div>
          </TabsContent>

            <TabsContent value="shopping" className="pt-4">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="goods-spending">Monthly spending on goods (₹)</Label>
                        <Input
                            id="goods-spending"
                            type="number"
                            placeholder="e.g., 25000 (clothing, electronics, furniture)"
                            value={goodsSpending}
                            onChange={(e) => setGoodsSpending(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="services-spending">Monthly spending on services (₹)</Label>
                        <Input
                            id="services-spending"
                            type="number"
                            placeholder="e.g., 12000 (entertainment, healthcare, education)"
                            value={servicesSpending}
                            onChange={(e) => setServicesSpending(e.target.value)}
                        />
                    </div>
                     <p className="text-xs text-muted-foreground">Estimates based on the carbon intensity of consumer spending.</p>
                </div>
            </TabsContent>

        </Tabs>

        <Separator className="my-6" />

        <div className="space-y-4">
            <h3 className="text-lg font-semibold font-headline">Estimated Monthly Emissions</h3>
            {totalCO2 > 0 ? (
                <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                     <div className="p-3 rounded-lg bg-accent/30">
                        <p className="text-xs text-muted-foreground">Transport</p>
                        <p className="text-lg font-bold">{transportCO2.toFixed(1)} kg</p>
                    </div>
                     <div className="p-3 rounded-lg bg-accent/30">
                        <p className="text-xs text-muted-foreground">Energy</p>
                        <p className="text-lg font-bold">{energyCO2.toFixed(1)} kg</p>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/30">
                        <p className="text-xs text-muted-foreground">Food</p>
                        <p className="text-lg font-bold">{foodCO2.toFixed(1)} kg</p>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/30">
                        <p className="text-xs text-muted-foreground">Shopping</p>
                        <p className="text-lg font-bold">{shoppingCO2.toFixed(1)} kg</p>
                    </div>
                </div>
                <Card className="p-4 bg-primary/10 border-primary/20 mt-4">
                     <div className="text-center">
                        <p className="text-sm text-primary/80">Total Estimated Monthly CO₂e</p>
                        <p className="text-2xl font-bold text-primary">{totalCO2.toFixed(1)} kg</p>
                        <p className="text-xs text-muted-foreground mt-1">Equivalent to {(totalCO2 * 12 / 1000).toFixed(2)} metric tons per year.</p>
                    </div>
                </Card>
                </>
            ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                    Fill in your usage data and click "Calculate" to see your estimated footprint.
                </p>
            )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" onClick={handleReset}><RefreshCw className="mr-2"/> Reset</Button>
        <Button onClick={handleCalculate}><Calculator className="mr-2"/> Calculate</Button>
      </CardFooter>
    </Card>
  )
}

    