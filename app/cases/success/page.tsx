import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, Home } from "lucide-react"

export default function CaseSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-2xl px-4 py-16">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="size-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Case Submitted Successfully!</CardTitle>
            <CardDescription>Your case has been received and is being processed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="mb-2 text-sm font-semibold">Case ID: #SO-2026-001234</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Save this case ID for tracking. We've also sent a confirmation email with all the details.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">What happens next?</h3>
              <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground">1.</span>
                  <span>We'll match your case with a verified subspecialist pathologist within 2 hours</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground">2.</span>
                  <span>The expert will review your report and slides using our digital platform</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground">3.</span>
                  <span>You'll receive the second opinion report within 2-3 business days</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground">4.</span>
                  <span>Track your case status anytime from your dashboard</span>
                </li>
              </ol>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button asChild className="w-full">
                <Link href="/cases">
                  View My Cases
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/">
                  <Home className="mr-2 size-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
