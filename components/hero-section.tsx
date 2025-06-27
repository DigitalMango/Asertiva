"use client"

import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-light mb-6 animate-fade-in">
            Empowering Companies with{" "}
            <span className="bg-gradient-to-r from-accent-blue to-accent-gray bg-clip-text text-transparent">
              Legal Intelligence
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-light/80 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
            Asertiva delivers law updates and news tailored to each client's industry, keeping your business compliant
            and informed with the latest legal developments.
          </p>

          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-accent-blue hover:bg-accent-blue/90 text-dark font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-delay-2"
          >
            Access Your Platform
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-accent-blue/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-accent-gray/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
    </section>
  )
}
