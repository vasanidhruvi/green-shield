import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import { Leaf, Users, Zap } from 'lucide-react'
import { InteractiveCard } from '@/components/ui/interactive-card'

const challenges = [
    { title: 'Meatless Mondays', description: 'Go vegetarian for one day a week.', progress: 75, icon: Leaf, reward: 'Veggie Badge' },
    { title: 'Commute Crusader', description: 'Use public transport or cycle to work.', progress: 50, icon: Zap, reward: '20 Points' },
    { title: 'Thrift Shopper', description: 'Buy one second-hand item instead of new.', progress: 100, completed: true, icon: Users, reward: 'Circular Economy Badge' },
]

const leaderboard = [
    { name: 'Alex Green', score: 2450, avatar: 'https://placehold.co/100x100' },
    { name: 'Brianna Eco', score: 2300, avatar: 'https://placehold.co/100x100' },
    { name: 'You', score: 2210, avatar: 'https://placehold.co/100x100', isCurrentUser: true },
    { name: 'Charlie Bloom', score: 2100, avatar: 'https://placehold.co/100x100' },
    { name: 'Diana Waters', score: 1980, avatar: 'https://placehold.co/100x100' },
]

export default function ChallengesPage() {
    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">Sustainability Challenges</h1>
                <p className="text-muted-foreground">Join challenges, earn rewards, and climb the leaderboard.</p>
            </header>

            <Tabs defaultValue="active" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-3">
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                </TabsList>
                <TabsContent value="active">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: '1500px' }}>
                        {challenges.filter(c => !c.completed).map((challenge) => (
                            <InteractiveCard key={challenge.title}>
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <challenge.icon className="w-8 h-8 text-primary" />
                                            <div>
                                                <CardTitle className="font-headline">{challenge.title}</CardTitle>
                                                <CardDescription>{challenge.description}</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Progress value={challenge.progress} className="w-full" />
                                        <p className="text-sm text-muted-foreground mt-2">{challenge.progress}% complete</p>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Badge variant="outline">{challenge.reward}</Badge>
                                        <Button size="sm">View Details</Button>
                                    </CardFooter>
                                </Card>
                            </InteractiveCard>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="completed">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: '1500px' }}>
                         {challenges.filter(c => c.completed).map((challenge) => (
                            <InteractiveCard key={challenge.title}>
                                <Card className="opacity-70">
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <challenge.icon className="w-8 h-8 text-muted-foreground" />
                                            <div>
                                                <CardTitle className="font-headline">{challenge.title}</CardTitle>
                                                <CardDescription>{challenge.description}</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm font-semibold text-primary">Challenge Completed!</p>
                                    </CardContent>
                                     <CardFooter>
                                        <Badge variant="secondary">{challenge.reward} Earned</Badge>
                                    </CardFooter>
                                </Card>
                            </InteractiveCard>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="leaderboard">
                    <InteractiveCard>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Community Leaderboard</CardTitle>
                                <CardDescription>See how you stack up against the community.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {leaderboard.map((user, index) => (
                                        <li key={user.name} className={`flex items-center gap-4 p-2 rounded-lg ${user.isCurrentUser ? 'bg-accent' : ''}`}>
                                            <span className="text-lg font-bold text-muted-foreground w-6">{index + 1}</span>
                                            <Avatar>
                                                <AvatarImage src={user.avatar} data-ai-hint="people portrait" />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className={`font-medium ${user.isCurrentUser ? 'font-bold' : ''}`}>{user.name}</span>
                                            <span className="ml-auto font-semibold text-primary">{user.score} pts</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </InteractiveCard>
                </TabsContent>
            </Tabs>
        </div>
    )
}
