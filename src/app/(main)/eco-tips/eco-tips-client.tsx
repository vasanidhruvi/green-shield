'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { generateTips } from '@/app/actions'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Lightbulb, ListChecks, PartyPopper, Car, Beef, Home, ShoppingBag, Users, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { InteractiveCard } from '@/components/ui/interactive-card'
import type { PersonalizedEcoTipsOutput } from '@/ai/flows/personalized-eco-tips'

const initialState: { message: string, plan?: PersonalizedEcoTipsOutput, errors?: any } = {
  message: '',
  plan: undefined,
  errors: {},
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Generating Your Plan...' : 'Generate My Eco-Action Plan'}
      <Zap className="ml-2" />
    </Button>
  )
}

const categoryIcons: Record<string, React.ElementType> = {
    "Transport": Car,
    "Food": Beef,
    "Home": Home,
    "Shopping": ShoppingBag,
    "Community": Users
}

const difficultyColors: Record<string, string> = {
    "Easy": "bg-green-500",
    "Medium": "bg-yellow-500",
    "Hard": "bg-red-500"
}


export function EcoTipsClient() {
  const [state, formAction] = useFormState(generateTips, initialState)

  return (
    <div className="grid gap-8 md:grid-cols-3" style={{ perspective: '1500px' }}>
      <InteractiveCard className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Eco Profile</CardTitle>
            <CardDescription>
              Help us craft the perfect action plan for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="lifestyle">Lifestyle & Habits</Label>
                <Textarea
                  id="lifestyle"
                  name="lifestyle"
                  placeholder="e.g., I live in a city apartment, commute by car, enjoy dining out, and travel internationally once a year."
                  required
                  rows={5}
                />
                {state.errors?.lifestyle && (
                  <p className="text-sm font-medium text-destructive">{state.errors.lifestyle[0]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Your Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g., San Francisco, CA"
                  required
                />
                 {state.errors?.location && (
                  <p className="text-sm font-medium text-destructive">{state.errors.location[0]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="climateIssues">Regional Climate Concerns</Label>
                <Textarea
                  id="climateIssues"
                  name="climateIssues"
                  placeholder="e.g., We experience frequent droughts and are concerned about wildfire risks."
                  required
                   rows={3}
                />
                {state.errors?.climateIssues && (
                  <p className="text-sm font-medium text-destructive">{state.errors.climateIssues[0]}</p>
                )}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </InteractiveCard>
      
      <div className="space-y-6 md:col-span-2">
        {state.plan?.actionSteps && state.plan.actionSteps.length > 0 ? (
           <div className="space-y-6">
             <InteractiveCard>
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <PartyPopper className="w-10 h-10 text-primary icon-3d"/>
                            <div>
                                <CardTitle className="text-primary font-headline">{state.plan.planTitle}</CardTitle>
                                <CardDescription>{state.plan.introduction}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </InteractiveCard>

            {state.plan.actionSteps.map((step, index) => {
                const Icon = categoryIcons[step.category] || ListChecks;
                const difficultyColor = difficultyColors[step.difficulty] || "bg-gray-400";
                return (
                     <InteractiveCard key={index}>
                        <Card>
                            <CardHeader className="flex flex-row items-start gap-4">
                               <div className={`p-2 rounded-full bg-accent/50 ${difficultyColor}`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-lg font-headline">{step.title}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                </div>
                            </CardHeader>
                             <CardFooter>
                               <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <Badge variant="outline">{step.category}</Badge>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-2.5 h-2.5 rounded-full ${difficultyColor}`}></div>
                                        <span>{step.difficulty}</span>
                                    </div>
                               </div>
                            </CardFooter>
                        </Card>
                    </InteractiveCard>
                )
            })}
           </div>
        ) : (
            <InteractiveCard>
                <Card className="flex flex-col items-center justify-center h-full text-center p-8 bg-accent/30 border-dashed">
                    <Lightbulb className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-muted-foreground font-headline">Your Personalized Action Plan Awaits</h3>
                    <p className="text-sm text-muted-foreground">Fill out your eco-profile, and our AI will generate a tailored plan to help you make a positive impact.</p>
                </Card>
            </InteractiveCard>
        )}
        {state.message && !state.plan?.actionSteps?.length && state.message !== 'Success!' && (
            <Alert variant={state.errors && Object.keys(state.errors).length > 0 ? "destructive" : "default"}>
                <AlertTitle>{state.errors && Object.keys(state.errors).length > 0 ? 'Error' : 'Notice'}</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
            </Alert>
        )}
      </div>
    </div>
  )
}
