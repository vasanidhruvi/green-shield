
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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

      <footer className="absolute bottom-0 p-4 text-center text-sm text-green-800/60 w-full">
        © {new Date().getFullYear()} Green Shield. All Rights Reserved.
      </footer>
    </div>
  )
}
