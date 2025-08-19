
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Rocket, Target } from "lucide-react";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="relative w-full h-48 rounded-lg overflow-hidden">
         <Image src="https://placehold.co/1200x400" alt="Team working together" fill style={{ objectFit: 'cover' }} data-ai-hint="diverse team working" />
         <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white p-4">
               <h1 className="text-3xl font-bold font-headline">About Green Shield</h1>
               <p className="text-white/90">Empowering a sustainable future, one action at a time.</p>
            </div>
         </div>
      </header>

      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-lg text-muted-foreground">
                Our mission is to make sustainable living accessible and rewarding for everyone. We believe that collective small actions can lead to significant global impact. Green Shield provides the tools, knowledge, and community support to empower individuals to take control of their environmental footprint and build a healthier planet for future generations.
            </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="font-headline">What We Do</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">
                Our project helps individuals and organizations measure their carbon footprint, take steps to reduce emissions, and offset the rest through verified, sustainable projects. From renewable energy to reforestation, we connect you with real solutions that make a difference.
            </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
                Green Shield was born from a simple idea: what if we could use technology to make sustainability a part of everyone's daily life? Frustrated by the complexity of understanding carbon footprints and the lack of engaging tools, our founders set out to build a platform that was not only informative but also fun and motivating. We started as a small team of passionate environmentalists and tech enthusiasts, and have grown into a community dedicated to driving positive change.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
                We envision a world where every individual is an active participant in the fight against climate change. A world where sustainable choices are the default, not the exception. Through Green Shield, we aim to build a global network of eco-conscious citizens who are not just tracking their impact, but actively shaping a cleaner, greener, and more equitable future for all.
            </p>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <CardTitle className="font-headline">Our Values</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
                <Target className="w-10 h-10 text-primary mb-2"/>
                <h3 className="font-semibold">Impact</h3>
                <p className="text-sm text-muted-foreground">We are focused on creating real, measurable environmental impact.</p>
            </div>
             <div className="flex flex-col items-center text-center">
                <Handshake className="w-10 h-10 text-primary mb-2"/>
                <h3 className="font-semibold">Community</h3>
                <p className="text-sm text-muted-foreground">We believe in the power of collective action and mutual support.</p>
            </div>
             <div className="flex flex-col items-center text-center">
                <Rocket className="w-10 h-10 text-primary mb-2"/>
                <h3 className="font-semibold">Innovation</h3>
                <p className="text-sm text-muted-foreground">We continuously innovate to provide the best tools for our users.</p>
            </div>
        </CardContent>
       </Card>
    </div>
  );
}
