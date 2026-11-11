import { HeroSection } from "./HeroSection.tsx"
import { HowItWorksSection } from "./HowItWorksSection.tsx"
import { JobsSection } from "./JobsSection.tsx"

export function HomePage() {
  return (
    <div className="flex w-full min-w-0 flex-col">
      <HeroSection />
      <HowItWorksSection />
      <JobsSection />
    </div>
  )
}
