import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Heart, MessageSquare, Repeat } from 'lucide-react'
import { InteractiveCard } from '@/components/ui/interactive-card'

const feedItems = [
    {
        user: { name: 'EcoWarriorAlex', avatar: 'https://placehold.co/100x100' },
        content: "Just completed the 'Meatless Mondays' challenge for a whole month! Feeling great and doing my part for the planet. 🥗 #GoGreen",
        image: "https://placehold.co/600x400",
        imageHint: "salad bowl",
        likes: 128,
        comments: 12,
        timestamp: "2h ago",
        badge: "Veggie Lover"
    },
    {
        user: { name: 'CycleSavvyBri', avatar: 'https://placehold.co/100x100' },
        content: "Switched my daily commute to cycling. The fresh air is amazing, and I've already saved an estimated 15kg of CO₂ this week!",
        image: "https://placehold.co/600x400",
        imageHint: "bicycle path",
        likes: 98,
        comments: 7,
        timestamp: "5h ago",
        badge: "Commute Crusader"
    },
    {
        user: { name: 'ThriftKingCharlie', avatar: 'https://placehold.co/100x100' },
        content: "My latest thrift store find! This jacket is amazing and I saved it from a landfill. Sustainable fashion is the future. ♻️",
        image: "https://placehold.co/600x400",
        imageHint: "vintage jacket",
        likes: 215,
        comments: 23,
        timestamp: "1d ago",
        badge: "Circular Economy"
    }
]

export default function CommunityPage() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">Community Feed</h1>
                <p className="text-muted-foreground">See how the Carbon Nexus community is making a difference.</p>
            </header>
            
            <div className="max-w-2xl mx-auto w-full space-y-6" style={{ perspective: '1500px' }}>
                {feedItems.map((item, index) => (
                    <InteractiveCard key={index}>
                        <Card>
                            <CardHeader className="flex flex-row gap-3">
                                 <Avatar>
                                    <AvatarImage src={item.user.avatar} data-ai-hint="people portrait"/>
                                    <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-base font-bold">{item.user.name}</CardTitle>
                                    <CardDescription>{item.timestamp}</CardDescription>
                                </div>
                                {item.badge && <Badge variant="secondary" className="ml-auto">{item.badge}</Badge>}
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4">{item.content}</p>
                                {item.image && (
                                    <div className="relative h-64 w-full rounded-lg overflow-hidden">
                                        <Image src={item.image} alt="Feed item image" fill style={{ objectFit: 'cover' }} data-ai-hint={item.imageHint} />
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-start gap-6 text-muted-foreground">
                                <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                                    <Heart className="h-4 w-4" />
                                    <span>{item.likes}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>{item.comments}</span>
                                </Button>
                                 <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                                    <Repeat className="h-4 w-4" />
                                    <span>Share</span>
                                </Button>
                            </CardFooter>
                        </Card>
                    </InteractiveCard>
                ))}
            </div>
        </div>
    )
}
