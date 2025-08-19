
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-green-50">
      <main className="flex-1 flex items-center justify-center p-4">
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-green-900">
            Green Shield
          </h1>
          <p className="mt-4 text-lg text-green-800/80 max-w-2xl mx-auto">
            Empowering you to understand, track, and reduce your carbon footprint through personalized insights, engaging challenges, and a supportive community.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="p-4 text-center text-sm text-green-800/60">
        © {new Date().getFullYear()} Green Shield. All Rights Reserved.
      </footer>
    </div>
  )
}
