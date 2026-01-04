import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Stethoscope, Clock, Shield, Upload, Search } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <Stethoscope className="size-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-balance">SecondOpinion</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
            Expert Pathology Second Opinions, <span className="text-primary">Simplified</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-pretty leading-relaxed">
            Connect with verified subspecialist pathologists across India. Get trusted, timely advisory opinions on your
            pathology reports and slides—from the comfort of your home.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/new-case">
                <Upload className="mr-2 size-4" />
                Submit Your Case
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
              <Link href="/experts">
                <Search className="mr-2 size-4" />
                Find an Expert
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border/40 bg-muted/30 py-12 md:py-16">
        <div className="container px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-balance">How It Works</h2>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-4">
            <Card className="flex flex-col items-center p-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="mt-4 font-semibold">Upload Your Report</h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">
                Share your pathology report, glass slides, or digital slides
              </p>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="mt-4 font-semibold">Expert Matching</h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">
                We route your case to verified subspecialist pathologists
              </p>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="mt-4 font-semibold">Digital Review</h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">
                Experts review using integrated digital pathology tools
              </p>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="mt-4 font-semibold">Receive Opinion</h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">
                Get a clear advisory report with recommendations
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container px-4 py-12 md:py-16">
        <h2 className="mb-10 text-center text-3xl font-bold text-balance">Why SecondOpinion.com</h2>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Report-First Approach</h3>
              <p className="mt-1 text-sm text-muted-foreground text-pretty leading-relaxed">
                Start with just your pathology report. We support multiple data formats.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Verified Experts</h3>
              <p className="mt-1 text-sm text-muted-foreground text-pretty leading-relaxed">
                All pathologists are MD/DNB certified with subspecialty expertise.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Fast Turnaround</h3>
              <p className="mt-1 text-sm text-muted-foreground text-pretty leading-relaxed">
                Get your second opinion within 2-3 business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-muted/30 py-12 md:py-16">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold text-balance">Ready to Get Started?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-pretty leading-relaxed">
            Join thousands of patients who have found clarity and confidence through expert pathology consultations.
          </p>
          <Button size="lg" asChild className="mt-6">
            <Link href="/new-case">Submit Your Case Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">© 2026 SecondOpinion.com. All rights reserved.</p>
            <nav className="flex gap-6 text-sm">
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
