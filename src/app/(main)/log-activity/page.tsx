
'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Car, Beef, Home, ShoppingBag, Leaf, Zap, ArrowLeft, BotMessageSquare } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"

const activityCategories = [
  { value: 'Transport', label: 'Transport', icon: Car },
  { value: 'Energy', label: 'Energy', icon: Home },
  { value: 'Food', label: 'Food', icon: Beef },
  { value: 'Goods', label: 'Shopping', icon: ShoppingBag },
  { value: 'Community', label: 'Community', icon: Leaf },
];

const formSchema = z.object({
  category: z.string({
    required_error: "Please select an activity category.",
  }),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  date: z.date({
    required_error: "A date for the activity is required.",
  }),
  co2eSaved: z.coerce.number().min(0, {
    message: "CO₂e saved must be a positive number.",
  }),
})

export default function LogActivityPage() {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      co2eSaved: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Activity Logged!",
      description: `Successfully logged "${values.title}" in ${values.category}.`,
    })
    form.reset()
    form.setValue("date", undefined)
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5"/>
            <span className="sr-only">Back</span>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-headline">Log a New Activity</h1>
          <p className="text-muted-foreground">Record your eco-friendly actions to track your impact and earn credits.</p>
        </div>
      </header>

      <div className="w-full max-w-2xl mx-auto">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Activity Details</CardTitle>
                <CardDescription>Fill in the details of the sustainable action you took.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {activityCategories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              <div className="flex items-center gap-2">
                                <cat.icon className="w-4 h-4 text-muted-foreground" />
                                <span>{cat.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Cycled to work" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Avoided using the car for my 5km commute." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Activity</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </Popover>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                        <FormMessage />
                      </FormItem>
                    )}
                />

                <FormField
                  control={form.control}
                  name="co2eSaved"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated CO₂e Saved (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1.2" {...field} />
                      </FormControl>
                      <FormDescription className="flex items-center gap-1.5 text-xs">
                        <BotMessageSquare className="w-3.5 h-3.5" />
                        Need help? We can estimate this for you soon.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full">
                  <Zap className="mr-2" /> Log Activity & Earn Credits
                </Button>
                <p className="text-xs text-muted-foreground">Your logged activities contribute to your Green Credits balance.</p>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
}
