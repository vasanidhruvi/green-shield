
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, BarChart, Handshake, Target, Zap } from 'lucide-react'
import * as React from 'react'

export default function LandingPage() {

  return (
    <div className="relative flex flex-col min-h-screen bg-green-50 items-center justify-center p-4">
        <div
            className="w-full max-w-3xl"
        >
            <div
                className="bg-white/30 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg border border-white/40"
            >
                <section className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline text-green-900" style={{textShadow: '0px 2px 4px rgba(0,0,0,0.1)'}}>
                        Green Shield
                    </h1>
                    <p className="mt-4 text-lg text-green-800/80 max-w-2xl mx-auto">
                        Empowering you to understand, track, and reduce your carbon footprint through personalized insights, engaging challenges, and a supportive community.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <Button asChild size="lg" className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_0_rgb(0,0,0,20%)] transition-shadow">
                            <Link href="/dashboard">
                                Get Started <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                    </div>
                </section>
            </div>
        </div>

        <div className="w-full max-w-3xl mt-12">
            <section className="space-y-6 text-left text-green-900/80 p-8 md:p-12">
                <h2 className="text-3xl font-bold font-headline text-green-900 text-center">
                    About Us
                </h2>
                <p>
                    We are a team dedicated to driving positive climate action by making carbon reduction and offsetting simple, transparent, and impactful.
                </p>

                <div>
                    <h3 className="text-2xl font-semibold font-headline text-green-900 mb-2">What We Do</h3>
                    <p>Our project helps individuals and organizations measure their carbon footprint, take steps to reduce emissions, and offset the rest through verified, sustainable projects. From renewable energy to reforestation, we connect you with real solutions that make a difference.</p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold font-headline text-green-900 mb-2">Our Aim</h3>
                    <p>Our mission is to support the global transition to a low-carbon future. By empowering people and businesses with the right tools and knowledge, we aim to make sustainability accessible, achievable, and measurable.</p>
                </div>
                
                <div>
                    <h3 className="text-2xl font-semibold font-headline text-green-900 mb-2">Our Values</h3>
                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-start gap-3">
                            <BarChart className="w-5 h-5 text-primary mt-1 flex-shrink-0"/>
                            <div>
                                <h4 className="font-bold">Transparency</h4>
                                <p className="text-sm">Clear and trustworthy data to track progress.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Target className="w-5 h-5 text-primary mt-1 flex-shrink-0"/>
                            <div>
                                <h4 className="font-bold">Impact</h4>
                                <p className="text-sm">Focused on projects that create lasting environmental benefits.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Handshake className="w-5 h-5 text-primary mt-1 flex-shrink-0"/>
                            <div>
                                <h4 className="font-bold">Collaboration</h4>
                                <p className="text-sm">Building a greener future together.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0"/>
                            <div>
                                <h4 className="font-bold">Innovation</h4>
                                <p className="text-sm">Using smart solutions to tackle climate challenges.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <p className="text-center pt-4 italic">
                    Together, we believe every step—big or small—brings us closer to a sustainable, net-zero world.
                </p>
            </section>
        </div>

      <footer className="py-8 mt-8 text-center text-sm text-green-800/60 w-full">
        © {new Date().getFullYear()} Green Shield. All Rights Reserved.
      </footer>
    </div>
  )
}
