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
import { Car, Home, Flame, Lightbulb, Calculator, RefreshCw } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

// Emission factors (example values in kg CO₂e per unit)
const EMISSION_FACTORS = {
  transport: {
    petrolCar: 0.192, // per km
    dieselCar: 0.171, // per km
    electricCar: 0.05, // per km (varies by grid)
    bus: 0.105, // per km
    train: 0.041, // per km
  },
  energy: {
    electricity: 0.233, // per kWh
    naturalGas: 2.02, // per m³
  },
}

export function CarbonCalculator() {
  // Transport State
  const [vehicleType, setVehicleType] = React.useState('petrolCar')
  const [distance, setDistance] = React.useState('')

  // Energy State
  const [electricity, setElectricity] = React.useState('')
  const [naturalGas, setNaturalGas] = React.useState('')

  // Results State
  const [transportCO2, setTransportCO2] = React.useState(0)
  const [energyCO2, setEnergyCO2] = React.useState(0)
  const [totalCO2, setTotalCO2] = React.useState(0)

  const handleCalculate = () => {
    const transportEmissions = (EMISSION_FACTORS.transport[vehicleType as keyof typeof EMISSION_FACTORS.transport] || 0) * Number(distance)
    const energyEmissions = (EMISSION_FACTORS.energy.electricity * Number(electricity)) + (EMISSION_FACTORS.energy.naturalGas * Number(naturalGas))
    
    setTransportCO2(transportEmissions)
    setEnergyCO2(energyEmissions)
    setTotalCO2(transportEmissions + energyEmissions)
  }

  const handleReset = () => {
    setVehicleType('petrolCar')
    setDistance('')
    setElectricity('')
    setNaturalGas('')
    setTransportCO2(0)
    setEnergyCO2(0)
    setTotalCO2(0)
  }


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Calculator className="w-6 h-6"/>
            Monthly Carbon Footprint Calculator
        </CardTitle>
        <CardDescription>
          Estimate your CO₂ emissions to understand your impact.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="transport" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transport">
                <Car className="mr-2"/> Transport
            </TabsTrigger>
            <TabsTrigger value="energy">
                <Home className="mr-2"/> Home Energy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transport" className="pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle-type">Vehicle Type</Label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger id="vehicle-type">
                    <SelectValue placeholder="Select your primary vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrolCar">Petrol Car</SelectItem>
                    <SelectItem value="dieselCar">Diesel Car</SelectItem>
                    <SelectItem value="electricCar">Electric Car</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="train">Train</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                <Label htmlFor="gas" className="flex items-center gap-1.5"><Flame className="w-4 h-4"/>Monthly Natural Gas Usage (m³)</Label>
                <Input
                  id="gas"
                  type="number"
                  placeholder="e.g., 50"
                  value={naturalGas}
                  onChange={(e) => setNaturalGas(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        <div className="space-y-4">
            <h3 className="text-lg font-semibold font-headline">Estimated Emissions</h3>
            {totalCO2 > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                     <div className="p-3 rounded-lg bg-accent/30">
                        <p className="text-xs text-muted-foreground">Transport</p>
                        <p className="text-xl font-bold">{transportCO2.toFixed(1)} kg</p>
                    </div>
                     <div className="p-3 rounded-lg bg-accent/30">
                        <p className="text-xs text-muted-foreground">Home Energy</p>
                        <p className="text-xl font-bold">{energyCO2.toFixed(1)} kg</p>
                    </div>
                     <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <p className="text-xs text-primary/80">Total Monthly CO₂e</p>
                        <p className="text-xl font-bold text-primary">{totalCO2.toFixed(1)} kg</p>
                    </div>
                </div>
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
