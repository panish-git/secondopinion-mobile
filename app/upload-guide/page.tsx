import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, FileText, Camera, Building2, Phone, CheckCircle2, AlertCircle } from "lucide-react"

export default function UploadGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/new-case">
              <ArrowLeft className="mr-2 size-4" />
              Back
            </Link>
          </Button>
        </div>
      </header>

      <main className="container max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance">How to Get Your Slides</h1>
          <p className="mt-2 text-muted-foreground text-pretty leading-relaxed">
            Follow this guide to retrieve your glass slides from the diagnostic lab
          </p>
        </div>

        <Alert className="mb-6">
          <AlertCircle className="size-4" />
          <AlertDescription>
            Most diagnostic labs retain glass slides for at least 3-6 months after the initial diagnosis. You have the
            right to request your slides for a second opinion.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          {/* Step 1 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="font-bold">1</span>
                </div>
                <CardTitle>Contact the Diagnostic Lab</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Call or visit the laboratory where your biopsy was processed. You'll need to provide:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                  <span className="leading-relaxed">Your pathology report number or case ID</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                  <span className="leading-relaxed">Patient name and date of biopsy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                  <span className="leading-relaxed">Valid ID proof</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="font-bold">2</span>
                </div>
                <CardTitle>Request Slide Release</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Ask for a slide release form. Some labs may require:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <FileText className="size-4 shrink-0 text-muted-foreground mt-0.5" />
                  <span className="leading-relaxed">Written request from referring doctor (sometimes optional)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Building2 className="size-4 shrink-0 text-muted-foreground mt-0.5" />
                  <span className="leading-relaxed">Destination lab information (you can provide our details)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="size-4 shrink-0 text-muted-foreground mt-0.5" />
                  <span className="leading-relaxed">Acknowledgment form to return slides after review</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="font-bold">3</span>
                </div>
                <CardTitle>Choose Delivery Method</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <h4 className="mb-2 font-semibold text-sm">Option A: Self-Pickup and Upload</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Pick up slides yourself, photograph them with good lighting, and upload the images to our platform
                    (most common and fastest option).
                  </p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <h4 className="mb-2 font-semibold text-sm">Option B: Direct Lab-to-Lab Transfer</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Request the lab to send slides directly to our partner scanning center. We'll coordinate the
                    transfer and digitization.
                  </p>
                </div>
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <h4 className="mb-2 font-semibold text-sm">Option C: Premium Pickup Service</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our logistics partner will collect slides from the lab and deliver them to our scanning center.
                    Additional ₹800 fee applies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Tips for Photographing Glass Slides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Camera className="size-5 shrink-0 text-primary mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm leading-relaxed">Use these tips for the best quality:</p>
                  <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                    <li>Use natural daylight or a bright white LED light</li>
                    <li>Place slide on a white background</li>
                    <li>Take multiple photos at different angles</li>
                    <li>Ensure the tissue area is in focus</li>
                    <li>Include the slide label in at least one photo</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button asChild className="flex-1 bg-transparent" variant="outline">
              <Link href="/new-case" className="bg-transparent">
                Back to Case Submission
              </Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/contact">Need Help? Contact Us</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
