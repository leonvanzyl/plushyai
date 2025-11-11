"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PricingCard } from "@/components/pricing/pricing-card";
import { mockPricingTiers } from "@/lib/mock-data";
import {
  Check,
  X,
  Sparkles,
  Coins,
  Clock,
  Shield,
  ArrowRight,
} from "lucide-react";

export default function PricingPage() {
  return (
    <main className="flex-1">
      {/* Page Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <Badge variant="outline" className="mb-4">
            <Coins className="mr-1 h-3 w-3" />
            Credit-Based Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect credit package for your needs. No subscriptions,
            no hidden fees. Pay once, use anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mockPricingTiers.map((tier) => (
            <PricingCard
              key={tier.id}
              name={tier.name}
              price={tier.price}
              credits={tier.credits}
              features={tier.features}
              isPopular={tier.isPopular}
            />
          ))}
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            All prices are one-time purchases. Credits never expire. No monthly
            fees.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">
              Compare All Plans
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what&apos;s included in each credit package
            </p>
          </div>

          <Card className="max-w-5xl mx-auto overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">Basic</th>
                    <th className="text-center p-4 font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        Pro
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold">Elite</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Number of Credits</td>
                    <td className="text-center p-4">30</td>
                    <td className="text-center p-4 bg-primary/5">100</td>
                    <td className="text-center p-4">200</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Price per Credit</td>
                    <td className="text-center p-4">$0.30</td>
                    <td className="text-center p-4 bg-primary/5">$0.19</td>
                    <td className="text-center p-4">$0.15</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">High-Quality Output</td>
                    <td className="text-center p-4">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="text-center p-4 bg-primary/5">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">PNG Download</td>
                    <td className="text-center p-4">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="text-center p-4 bg-primary/5">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">SVG Download</td>
                    <td className="text-center p-4">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center p-4 bg-primary/5">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Email Support</td>
                    <td className="text-center p-4">Standard</td>
                    <td className="text-center p-4 bg-primary/5">Priority</td>
                    <td className="text-center p-4">24/7 Priority</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Credits Never Expire</td>
                    <td className="text-center p-4">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="text-center p-4 bg-primary/5">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Early Access to Features</td>
                    <td className="text-center p-4">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center p-4 bg-primary/5">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">Commercial Usage Rights</td>
                    <td className="text-center p-4">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center p-4 bg-primary/5">
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* How Credits Work Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">
              How Credits Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding our simple and flexible credit system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Coins className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">1 Credit = 1 Generation</h3>
              <p className="text-muted-foreground">
                Each plushie generation costs exactly 1 credit. Simple, clear,
                and predictable pricing with no surprises.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Credits Never Expire</h3>
              <p className="text-muted-foreground">
                Buy credits once and use them whenever you want. No monthly
                fees, no pressure to use them quickly.
              </p>
            </Card>

            <Card className="p-6 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Secure Payment</h3>
              <p className="text-muted-foreground">
                All transactions are encrypted and secure. We support multiple
                payment methods for your convenience.
              </p>
            </Card>
          </div>

          {/* Visual Diagram */}
          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-background">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">30-200</div>
                  <div className="text-sm text-muted-foreground">
                    Credits Available
                  </div>
                </div>
                <ArrowRight className="h-8 w-8 text-muted-foreground rotate-90 md:rotate-0" />
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">$9-29</div>
                  <div className="text-sm text-muted-foreground">
                    One-Time Purchase
                  </div>
                </div>
                <ArrowRight className="h-8 w-8 text-muted-foreground rotate-90 md:rotate-0" />
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">∞</div>
                  <div className="text-sm text-muted-foreground">
                    Lifetime Access
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Got questions? We&apos;ve got answers
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-background rounded-lg border px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  Do credits expire?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No! All credits are lifetime credits. Once you purchase them,
                  they never expire. Use them at your own pace, whenever you
                  need them.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-background rounded-lg border px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  Can I get a refund?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! We offer a 30-day money-back guarantee. If you&apos;re not
                  satisfied with Plushify, contact our support team for a full
                  refund of unused credits.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-background rounded-lg border px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  How much does each generation cost?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Each plushie generation costs exactly 1 credit. It&apos;s that
                  simple! No hidden fees or variable pricing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-background rounded-lg border px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  Can I buy more credits later?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely! You can purchase additional credit packages
                  anytime. Your new credits will be added to your existing
                  balance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-background rounded-lg border px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  Do you offer bulk pricing?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! The more credits you buy, the lower the price per credit.
                  Our Elite package offers the best value at just $0.15 per
                  credit. For enterprise needs, contact us for custom pricing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-background rounded-lg border px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We accept all major credit cards (Visa, Mastercard, American
                  Express), PayPal, and various other payment methods through
                  our secure payment processor.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="bg-background rounded-lg border px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  Can I share credits with others?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Credits are tied to your account and cannot be transferred.
                  However, you can create plushies for anyone and share the
                  results with them!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="bg-background rounded-lg border px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  What if I run out of credits?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Simply purchase more credits! You can buy additional packages
                  at any time, and they&apos;ll be instantly added to your
                  account balance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="bg-background rounded-lg border px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  Do I need a subscription?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No! Plushify uses a one-time purchase model. Buy credits once
                  and use them forever. No monthly fees, no auto-renewals, no
                  subscriptions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="bg-background rounded-lg border px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  Can I use generated plushies commercially?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Commercial usage rights are included with our Elite package.
                  Basic and Pro packages are for personal use only. Check our
                  Terms of Service for full details.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions? We&apos;re here to help!
            </p>
            <Button asChild variant="outline">
              <Link href="/docs/faq">View Full FAQ</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose your perfect credit package and start creating adorable
              plushies today
            </p>
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/dashboard">
                Start Creating <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
