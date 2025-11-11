"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PlushifyIcon } from "@/components/plushify-logo";
import { FeatureCard } from "@/components/landing/feature-card";
import {
  mockFeatures,
  mockTestimonials,
  mockGenerations,
} from "@/lib/mock-data";
import {
  Upload,
  Sparkles,
  Download,
  ArrowRight,
  Star,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PlushifyIcon size="xl" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Transform Your Photos into{" "}
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                Adorable Plushies
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Turn any photo into an adorable AI-generated plushie design in
              seconds. Perfect for gifts, decorations, and cherished memories.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>

          {/* Hero Image/Showcase */}
          <div className="mt-12 relative">
            <div className="rounded-2xl border-4 border-primary/20 bg-muted/50 p-8 shadow-2xl backdrop-blur">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockGenerations.slice(0, 4).map((gen, index) => (
                  <div
                    key={gen.id}
                    className="aspect-square rounded-lg bg-background/50 border-2 border-primary/10 overflow-hidden hover:border-primary/30 transition-all hover:scale-105"
                  >
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      Plushie {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">
              Why Choose Plushify?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the magic of AI-powered plushie creation with features
              designed to delight
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {mockFeatures.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to create your adorable plushie design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative text-center space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border-4 border-primary/20">
                    <Upload className="h-10 w-10 text-primary" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0 flex items-center justify-center">
                    1
                  </Badge>
                </div>
              </div>
              <h3 className="text-2xl font-bold">Upload Your Photo</h3>
              <p className="text-muted-foreground">
                Choose any photo of a person, pet, or object you want to
                transform into a plushie
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border-4 border-primary/20">
                    <Sparkles className="h-10 w-10 text-primary" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0 flex items-center justify-center">
                    2
                  </Badge>
                </div>
              </div>
              <h3 className="text-2xl font-bold">AI Transforms It</h3>
              <p className="text-muted-foreground">
                Our advanced AI processes your image and creates an adorable
                plushie design in seconds
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border-4 border-primary/20">
                    <Download className="h-10 w-10 text-primary" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0 flex items-center justify-center">
                    3
                  </Badge>
                </div>
              </div>
              <h3 className="text-2xl font-bold">Download Your Plushie</h3>
              <p className="text-muted-foreground">
                Download your high-quality plushie design to share, print, or
                keep as a digital keepsake
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Gallery Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">See the Magic</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check out these amazing transformations created by our users
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {mockGenerations.slice(0, 8).map((gen, index) => (
              <Card
                key={gen.id}
                className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="aspect-square bg-muted/50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="text-4xl">🧸</div>
                      <div className="text-xs text-muted-foreground">
                        Example {index + 1}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Badge>View Details</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/gallery">
                View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of happy users creating adorable plushie designs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {mockTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="p-6 space-y-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <Avatar className="h-10 w-10 bg-primary/10">
                    <div className="flex items-center justify-center h-full w-full text-primary font-bold">
                      {testimonial.name[0]}
                    </div>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Verified User
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
                Start Creating Your Plushie Today
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Join our community and transform your favorite photos into
                adorable plushie designs in seconds
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Credits never expire</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Instant results</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/dashboard">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link href="/docs">Learn More</Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/dashboard"
                className="text-primary hover:underline font-medium"
              >
                Sign in to your dashboard
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
