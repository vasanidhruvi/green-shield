import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Bell, Shield, Upload } from "lucide-react";
import { InteractiveCard } from "@/components/ui/interactive-card";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and notification settings.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
            <InteractiveCard>
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your name, email, and profile picture.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="flex items-center gap-6">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src="https://placehold.co/100x100" data-ai-hint="people portrait"/>
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <Button variant="outline"><Upload className="mr-2"/> Change Picture</Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                                <Input id="name" defaultValue="Eco Warrior" className="pl-9"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                             <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                                <Input id="email" type="email" defaultValue="user@example.com" className="pl-9"/>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </InteractiveCard>

             <InteractiveCard>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Choose what you want to be notified about.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                    <div>
                      <Label htmlFor="weekly-summary">Weekly Summary</Label>
                      <p className="text-xs text-muted-foreground">Get a summary of your weekly progress and impact.</p>
                    </div>
                    <Switch id="weekly-summary" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                    <div>
                      <Label htmlFor="challenge-updates">Challenge Updates</Label>
                      <p className="text-xs text-muted-foreground">Receive notifications about new challenges and milestones.</p>
                    </div>
                    <Switch id="challenge-updates" defaultChecked />
                  </div>
                   <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                    <div>
                      <Label htmlFor="community-alerts">Community Alerts</Label>
                       <p className="text-xs text-muted-foreground">Get notified about likes and comments on your posts.</p>
                    </div>
                    <Switch id="community-alerts" />
                  </div>
                </CardContent>
              </Card>
            </InteractiveCard>
        </div>

        <div className="space-y-8">
           <InteractiveCard>
             <Card>
                <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                    <CardDescription>Manage your account security settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <Button variant="outline" className="w-full justify-start">
                        <Shield className="mr-2"/> Change Password
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                        Delete Account
                    </Button>
                </CardContent>
             </Card>
           </InteractiveCard>
        </div>
      </div>
    </div>
  );
}
