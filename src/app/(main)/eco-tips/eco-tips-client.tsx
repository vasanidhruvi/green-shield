'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { generateTips } from '@/app/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Lightbulb, ListChecks, PartyPopper } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { InteractiveCard } from '@/components/ui/interactive-card'

const initialState = {
  message: '',
  tips: [],
  errors: {},
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Generating...' : 'Get My Tips'}
    </Button>
  )
}

export function EcoTipsClient() {
  const [state, formAction] = useFormState(generateTips, initialState)

  return (
    <div className="grid gap-8 md:grid-cols-2" style={{ perspective: '1500px' }}>
      <InteractiveCard>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Tell us about yourself</CardTitle>
            <CardDescription>
              The more details you provide, the better your personalized tips will be.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="lifestyle">Lifestyle</Label>
                <Textarea
                  id="lifestyle"
                  name="lifestyle"
                  placeholder="e.g., I live in a city apartment, commute by car, enjoy dining out, and travel internationally once a year."
                  required
                />
                {state.errors?.lifestyle && (
                  <p className="text-sm font-medium text-destructive">{state.errors.lifestyle[0]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
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
                <Label htmlFor="climateIssues">Regional Climate Issues</Label>
                <Textarea
                  id="climateIssues"
                  name="climateIssues"
                  placeholder="e.g., We experience frequent droughts and are concerned about wildfire risks."
                  required
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
      
      <div className="space-y-4">
        {state.message && state.tips && state.tips.length > 0 ? (
           <InteractiveCard>
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                  <div className="flex items-center gap-3">
                      <PartyPopper className="w-8 h-8 text-primary"/>
                      <div>
                          <CardTitle className="text-primary font-headline">{state.message}</CardTitle>
                          <CardDescription>Here are some ideas to get you started on your eco-journey.</CardDescription>
                      </div>
                  </div>
              </CardHeader>
              <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                      {state.tips.map((tip, index) => (
                          <AccordionItem value={`item-${index}`} key={index}>
                              <AccordionTrigger>
                                  <div className="flex items-center gap-2">
                                      <ListChecks className="w-4 h-4 text-primary" />
                                      <span>Tip #{index + 1}</span>
                                  </div>
                              </AccordionTrigger>
                              <AccordionContent>{tip}</AccordionContent>
                          </AccordionItem>
                      ))}
                  </Accordion>
              </CardContent>
            </Card>
           </InteractiveCard>
        ) : (
            <InteractiveCard>
                <Card className="flex flex-col items-center justify-center h-full text-center p-8 bg-accent/30 border-dashed">
                    <Lightbulb className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-muted-foreground font-headline">Your tips will appear here</h3>
                    <p className="text-sm text-muted-foreground">Fill out the form to get personalized recommendations from our AI assistant.</p>
                </Card>
            </InteractiveCard>
        )}
        {state.message && !state.tips?.length && (
            <Alert variant={state.errors ? "destructive" : "default"}>
                <AlertTitle>{state.errors ? 'Error' : 'Notice'}</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
            </Alert>
        )}
      </div>
    </div>
  )
}
