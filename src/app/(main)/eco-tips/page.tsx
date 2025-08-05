import { EcoTipsClient } from './eco-tips-client'

export default function EcoTipsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">AI-Powered Eco-Tips</h1>
        <p className="text-muted-foreground">Get personalized tips to reduce your environmental impact.</p>
      </header>
      <EcoTipsClient />
    </div>
  )
}
