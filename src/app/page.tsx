
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Logo } from '@/components/logo'

export default function LandingPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-green-50 text-gray-800">
      <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-teal-50/50 to-transparent z-10"></div>
      
      <main className="relative z-20 flex-1 flex items-center justify-center p-4">
        <section className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <Logo />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary">
            Welcome to Green Shield
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
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

      <footer className="relative z-20 p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Green Shield. All Rights Reserved.
      </footer>
    </div>
  )
}
