
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 md:p-6 flex justify-between items-center">
        <Logo />
        <Button asChild variant="ghost">
          <Link href="/dashboard">
            Sign In
          </Link>
        </Button>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <section className="text-center max-w-4xl mx-auto">
            <div className="relative w-full max-w-4xl aspect-[2/1] mx-auto rounded-lg overflow-hidden mb-8 border shadow-lg">
                <Image src="https://placehold.co/1200x600" alt="Eco-friendly illustration" fill style={{ objectFit: 'cover' }} data-ai-hint="sustainable living nature" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            Take Control of Your Environmental Impact
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Green Shield empowers you to understand, track, and reduce your carbon footprint through personalized insights, engaging challenges, and a supportive community.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Go to Dashboard <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Green Shield. All Rights Reserved.
      </footer>
    </div>
  )
}
