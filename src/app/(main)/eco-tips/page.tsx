
import { EcoTipsClient } from './eco-tips-client'
import Image from 'next/image'

export default function EcoTipsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="relative w-full h-48 rounded-lg overflow-hidden">
         <Image src="https://placehold.co/1200x400" alt="Lush green leaves" fill style={{ objectFit: 'cover' }} data-ai-hint="green leaves" />
         <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white p-4">
               <h1 className="text-3xl font-bold font-headline">AI-Powered Eco-Tips</h1>
               <p className="text-white/90">Get personalized tips to reduce your environmental impact.</p>
            </div>
         </div>
      </header>
      <EcoTipsClient />
    </div>
  )
}
