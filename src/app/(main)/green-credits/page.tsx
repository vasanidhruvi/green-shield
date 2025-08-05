import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Briefcase, Download, Feather, Handshake, Sprout, Zap, ShieldCheck, FileText, Building2 } from 'lucide-react'
import { InteractiveCard } from '@/components/ui/interactive-card'
import Image from 'next/image'

const partnerLogos = [
    { name: 'Govt. of India', image: 'https://placehold.co/150x50' },
    { name: 'Green NGO', image: 'https://placehold.co/150x50' },
    { name: 'Eco Brand', image: 'https://placehold.co/150x50' },
    { name: 'Solar Inc.', image: 'https://placehold.co/150x50' },
]

export default function GreenCreditsPage() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">Green Credits Programme</h1>
                <p className="text-muted-foreground">Turn your sustainable actions into tangible rewards and real-world impact.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ perspective: '1500px' }}>
                <div className="lg:col-span-2 space-y-6">
                    <InteractiveCard>
                        <Card className="bg-primary/5 border-primary/20">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <Feather className="w-10 h-10 text-primary" />
                                    <div>
                                        <CardTitle className="font-headline text-primary">What are Green Credits?</CardTitle>
                                        <CardDescription>Think of Green Credits as a reward for your positive environmental actions, analogous to solar subsidies. They are a digital currency for sustainability.</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p>By participating in challenges, reducing your carbon footprint, and making eco-friendly choices, you earn Green Credits. This system reinforces sustainable habits and links your digital actions to real-world environmental and economic benefits, like supporting green jobs and local eco-projects.</p>
                            </CardContent>
                        </Card>
                    </InteractiveCard>

                    <InteractiveCard>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">How to Earn Credits</CardTitle>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                                    <Zap className="w-6 h-6 text-yellow-500 mt-1" />
                                    <div>
                                        <h3 className="font-semibold">Complete Challenges</h3>
                                        <p className="text-sm text-muted-foreground">Every challenge you complete rewards you with a set number of Green Credits.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                                    <Sprout className="w-6 h-6 text-green-500 mt-1" />
                                    <div>
                                        <h3 className="font-semibold">Log Eco-Actions</h3>
                                        <p className="text-sm text-muted-foreground">Consistently log activities like cycling, recycling, or using less energy.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </InteractiveCard>

                     <InteractiveCard>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Redeem Your Credits</CardTitle>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-4">
                               <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                                    <Briefcase className="w-6 h-6 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold">Support Green Projects</h3>
                                        <p className="text-sm text-muted-foreground">Fund verified environmental projects, such as reforestation or renewable energy initiatives.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                                    <Handshake className="w-6 h-6 text-accent-foreground mt-1" />
                                    <div>
                                        <h3 className="font-semibold">Partner Offers</h3>
                                        <p className="text-sm text-muted-foreground">Get exclusive discounts and offers from our sustainable brand partners.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </InteractiveCard>
                </div>

                <div className="space-y-6 row-start-1 lg:row-start-auto">
                    <InteractiveCard>
                        <Card className="text-center bg-accent/30">
                            <CardHeader>
                                <Award className="w-12 h-12 text-yellow-600 mx-auto" />
                                <CardTitle className="font-headline text-accent-foreground">Your Balance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-bold text-accent-foreground">475</p>
                                <p className="text-sm text-muted-foreground">Green Credits</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">View History</Button>
                            </CardFooter>
                        </Card>
                    </InteractiveCard>

                    <InteractiveCard>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Our Partners</CardTitle>
                                <CardDescription>We collaborate across sectors to maximize your impact.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                {partnerLogos.map(logo => (
                                     <div key={logo.name} className="flex items-center justify-center p-2 bg-muted/50 rounded-md">
                                        <Image src={logo.image} alt={logo.name} width={100} height={40} className="object-contain" data-ai-hint="logo" />
                                     </div>
                                ))}
                            </CardContent>
                        </Card>
                    </InteractiveCard>
                </div>
            </div>
             <InteractiveCard>
                <Card className="bg-accent/50">
                    <CardHeader>
                        <CardTitle className="font-headline">Supporting National Infrastructure</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-accent-foreground">
                        <p>By participating, you're helping to build a digitally native citizen base for India’s emerging national carbon credit infrastructure. Your actions contribute to a larger, nationwide effort for a sustainable future.</p>
                    </CardContent>
                    <CardFooter>
                         <Button variant="link" className="p-0 text-accent-foreground items-center gap-1">Learn more <Download className="w-4 h-4" /></Button>
                    </CardFooter>
                </Card>
            </InteractiveCard>
             <InteractiveCard>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Verification and Reporting</CardTitle>
                        <CardDescription>Ensuring your actions have a real, verifiable impact.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4 p-3 bg-background/50 rounded-lg">
                            <Building2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Official Collaboration</h3>
                                <p className="text-sm text-muted-foreground">We are exploring collaborations with MoEFCC, BEE, and state SDAs to pilot integrations into the national Green Credit reporting pipelines.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-3 bg-background/50 rounded-lg">
                            <ShieldCheck className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Standardized Verification</h3>
                                <p className="text-sm text-muted-foreground">Our credit verification flow is designed to align with the entry criteria for voluntary carbon project registration under the Carbon Credit Trading Scheme (CCTS).</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-3 bg-background/50 rounded-lg">
                            <Handshake className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Grassroots Engagement</h3>
                                <p className="text-sm text-muted-foreground">We engage with local environmental NGOs and cooperative bodies to validate grassroots actions and ensure community impact.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4 p-3 bg-background/50 rounded-lg">
                            <FileText className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">Official Documentation</h3>
                                <p className="text-sm text-muted-foreground">We provide template dashboards and reports that individuals and SMEs can use as part of their official documentation for sustainability schemes.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </InteractiveCard>
        </div>
    )
}
