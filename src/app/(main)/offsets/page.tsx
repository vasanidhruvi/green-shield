import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Droplets, Sprout, Wind } from 'lucide-react'
import { InteractiveCard } from '@/components/ui/interactive-card'

const offsetProjects = [
    {
        title: "Reforestation in the Amazon",
        description: "Plant trees to restore vital ecosystems and absorb CO₂.",
        pricePerTon: 15.00,
        icon: Sprout,
        image: "https://placehold.co/600x400",
        imageHint: "forest canopy"
    },
    {
        title: "Wind Power in Costa Rica",
        description: "Support the generation of clean, renewable wind energy.",
        pricePerTon: 18.50,
        icon: Wind,
        image: "https://placehold.co/600x400",
        imageHint: "wind turbine"
    },
    {
        title: "Clean Water Access in Kenya",
        description: "Provide communities with water filters, reducing the need to boil water with firewood.",
        pricePerTon: 12.75,
        icon: Droplets,
        image: "https://placehold.co/600x400",
        imageHint: "clean water"
    }
]

export default function OffsetsPage() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">Purchase Carbon Offsets</h1>
                <p className="text-muted-foreground">Neutralize your carbon footprint by supporting certified climate projects.</p>
            </header>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: '1500px' }}>
                {offsetProjects.map((project) => (
                    <InteractiveCard key={project.title}>
                        <Card className="flex flex-col h-full">
                            <CardHeader>
                                <div className="relative h-40 w-full rounded-t-lg overflow-hidden mb-4">
                                    <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover' }} data-ai-hint={project.imageHint}/>
                                </div>
                                <div className="flex items-start gap-4">
                                    <project.icon className="w-8 h-8 text-primary mt-1" />
                                    <div>
                                        <CardTitle className="font-headline">{project.title}</CardTitle>
                                        <CardDescription>{project.description}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                {/* Can add more details here */}
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <div className="text-lg font-bold text-primary">${project.pricePerTon.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/ ton CO₂e</span></div>
                                <Button>Offset Now</Button>
                            </CardFooter>
                        </Card>
                    </InteractiveCard>
                ))}
            </div>

            <InteractiveCard>
                <Card className="bg-accent/50">
                    <CardHeader>
                        <CardTitle className="font-headline">What is Carbon Offsetting?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-accent-foreground">
                        <p>Carbon offsetting is a way to compensate for your emissions by funding an equivalent carbon dioxide saving elsewhere.</p>
                        <p>Our projects are verified by internationally recognized standards to ensure they deliver real, permanent, and additional climate benefits.</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="link" className="p-0 text-accent-foreground">Learn More</Button>
                    </CardFooter>
                </Card>
            </InteractiveCard>
        </div>
    )
}
