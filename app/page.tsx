import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesGrid />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-bold text-primary mb-4">FitMalta</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your complete fitness companion in Malta. Transform your body, mind, and lifestyle with our
                comprehensive platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="/workouts" className="hover:text-primary transition-colors">
                    Workouts
                  </a>
                </li>
                <li>
                  <a href="/meal-plans" className="hover:text-primary transition-colors">
                    Meal Plans
                  </a>
                </li>
                <li>
                  <a href="/gyms" className="hover:text-primary transition-colors">
                    Gyms
                  </a>
                </li>
                <li>
                  <a href="/calculator" className="hover:text-primary transition-colors">
                    Calculator
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 FitMalta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
