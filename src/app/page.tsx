
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-background text-white">
      <Image 
        src="https://placehold.co/1920x1080" 
        alt="Lush green landscape"
        fill
        style={{ objectFit: 'cover'}}
        className="absolute inset-0 z-0"
        data-ai-hint="green landscape"
      />
      <div className="absolute inset-0 bg-primary/80 z-10"></div>
      
      <main className="relative z-20 flex-1 flex items-center justify-center p-4">
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg">
            Green Shield
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto drop-shadow-sm">
            Green Shield empowers you to understand, track, and reduce your carbon footprint through personalized insights, engaging challenges, and a supportive community.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="relative z-20 p-4 text-center text-sm text-white/70">
        © {new Date().getFullYear()} Green Shield. All Rights Reserved.
      </footer>
    </div>
  )
}
