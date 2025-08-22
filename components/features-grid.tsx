import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dumbbell, UtensilsCrossed, MapPin, Calculator } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Dumbbell,
    title: "Workout Plans",
    description:
      "Comprehensive workout routines with different splits - full body, push/pull/legs, upper/lower, and more. Filter by time, frequency, and goals.",
    href: "/workouts",
    color: "text-primary",
  },
  {
    icon: UtensilsCrossed,
    title: "Meal Plans",
    description:
      "Tailored nutrition plans for bulking and cutting phases. Choose from quick or slow approaches with easy or challenging recipes.",
    href: "/meal-plans",
    color: "text-accent",
  },
  {
    icon: MapPin,
    title: "Gyms in Malta",
    description:
      "Discover the best gyms across Malta with exclusive promo codes. Find the perfect training environment near you.",
    href: "/gyms",
    color: "text-primary",
  },
  {
    icon: Calculator,
    title: "Calorie Calculator",
    description:
      "Calculate your daily caloric needs based on your goals. Whether bulking, cutting, or maintaining - get precise numbers.",
    href: "/calculator",
    color: "text-accent",
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for Fitness Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From personalized workouts to nutrition guidance, we've got every aspect of your fitness journey covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-card">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </CardDescription>
                <Link href={feature.href}>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Explore
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
