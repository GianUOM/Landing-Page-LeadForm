import { HeroSection } from './components/HeroSection'
import { FeaturesSection } from './components/FeaturesSection'
import { RevenueLeakVisual } from './components/RevenueLeakVisual'
import { SolutionsSection } from './components/SolutionsSection'
import { PlansSection } from './components/PlansSection'
import { CTASection } from './components/CTASection'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="site-shell bg-background text-foreground">
      <HeroSection />
      <FeaturesSection />
      <RevenueLeakVisual />
      <SolutionsSection />
      <PlansSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App
