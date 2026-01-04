"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, FileText, ImageIcon, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NewCasePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [hasSlides, setHasSlides] = useState<string>("")
  const [slideType, setSlideType] = useState<string>("")
  const [urgency, setUrgency] = useState<string>("standard")
  const [reportFile, setReportFile] = useState<File | null>(null)
  const [slideFiles, setSlideFiles] = useState<File[]>([])
  const [needsPickup, setNeedsPickup] = useState(false)

  const handleReportUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReportFile(e.target.files[0])
    }
  }

  const handleSlideUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSlideFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    router.push("/cases/success")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container max-w-3xl px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div
            className={`flex size-8 items-center justify-center rounded-full text-sm font-medium ${
              step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            1
          </div>
          <div className={`h-1 w-12 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
          <div
            className={`flex size-8 items-center justify-center rounded-full text-sm font-medium ${
              step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            2
          </div>
          <div className={`h-1 w-12 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
          <div
            className={`flex size-8 items-center justify-center rounded-full text-sm font-medium ${
              step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            3
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Case Information</CardTitle>
              <CardDescription>Tell us about your pathology case</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="patient-name">Patient Name</Label>
                <Input id="patient-name" placeholder="Enter patient name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="Enter age" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diagnosis">Initial Diagnosis (from report)</Label>
                <Input id="diagnosis" placeholder="e.g., Breast carcinoma, Lung adenocarcinoma" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinical-history">Clinical History</Label>
                <Textarea
                  id="clinical-history"
                  placeholder="Brief clinical history and reason for second opinion..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Do you have glass slides or digital slides?</Label>
                <RadioGroup value={hasSlides} onValueChange={setHasSlides}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="report-only" id="report-only" />
                    <Label htmlFor="report-only" className="font-normal">
                      Report only (no slides)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="need-slides" id="need-slides" />
                    <Label htmlFor="need-slides" className="font-normal">
                      I need to retrieve glass slides from lab
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="have-glass" id="have-glass" />
                    <Label htmlFor="have-glass" className="font-normal">
                      I have glass slides
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="have-digital" id="have-digital" />
                    <Label htmlFor="have-digital" className="font-normal">
                      I have digital slides (WSI)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {hasSlides === "need-slides" && (
                <Alert>
                  <AlertCircle className="size-4" />
                  <AlertDescription>
                    We'll guide you through the process of retrieving your slides from the lab after case submission.
                  </AlertDescription>
                </Alert>
              )}

              <Button onClick={() => setStep(2)} className="w-full" disabled={!hasSlides}>
                Continue to Upload
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: File Upload */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>Upload your pathology report and slides (if available)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="report-upload">Pathology Report (Required)</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="report-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleReportUpload}
                    className="cursor-pointer"
                  />
                </div>
                {reportFile && (
                  <div className="flex items-center gap-2 rounded-md border border-border bg-muted/50 p-3 text-sm">
                    <FileText className="size-4 text-primary" />
                    <span className="flex-1">{reportFile.name}</span>
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                )}
              </div>

              {(hasSlides === "have-glass" || hasSlides === "have-digital") && (
                <div className="space-y-2">
                  <Label htmlFor="slide-upload">
                    {hasSlides === "have-glass" ? "Glass Slide Images" : "Digital Slides (WSI)"}
                  </Label>
                  <Input
                    id="slide-upload"
                    type="file"
                    accept={hasSlides === "have-digital" ? ".svs,.ndpi,.dcm" : ".jpg,.jpeg,.png"}
                    multiple
                    onChange={handleSlideUpload}
                    className="cursor-pointer"
                  />
                  {slideFiles.length > 0 && (
                    <div className="space-y-2">
                      {slideFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 rounded-md border border-border bg-muted/50 p-3 text-sm"
                        >
                          <ImageIcon className="size-4 text-primary" />
                          <span className="flex-1">{file.name}</span>
                          <CheckCircle2 className="size-4 text-primary" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {hasSlides === "have-glass" && (
                <div className="flex items-center space-x-2 rounded-md border border-border bg-muted/30 p-4">
                  <Checkbox
                    id="needs-pickup"
                    checked={needsPickup}
                    onCheckedChange={(checked) => setNeedsPickup(checked as boolean)}
                  />
                  <Label htmlFor="needs-pickup" className="font-normal text-sm leading-relaxed">
                    I need slide pickup and delivery service (Premium add-on)
                  </Label>
                </div>
              )}

              <Alert>
                <AlertCircle className="size-4" />
                <AlertDescription>
                  All uploads are encrypted and stored securely. Only the assigned expert pathologist will have access.
                </AlertDescription>
              </Alert>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1" disabled={!reportFile}>
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Expert Selection & Submit */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Expert Selection</CardTitle>
              <CardDescription>Choose how you'd like to find your expert</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>How would you like to proceed?</Label>
                <RadioGroup defaultValue="auto-match">
                  <div className="flex items-start space-x-3 rounded-lg border border-border p-4">
                    <RadioGroupItem value="auto-match" id="auto-match" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="auto-match" className="font-semibold">
                        Auto-Match (Recommended)
                      </Label>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                        We'll route your case to the best-matched verified subspecialist based on your diagnosis
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 rounded-lg border border-border p-4">
                    <RadioGroupItem value="browse-experts" id="browse-experts" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="browse-experts" className="font-semibold">
                        Browse Experts
                      </Label>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                        Search and select a specific pathologist by subspecialty or experience
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Urgency Level</Label>
                <RadioGroup value={urgency} onValueChange={setUrgency}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="font-normal">
                      Standard (2-3 business days)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urgent" id="urgent" />
                    <Label htmlFor="urgent" className="font-normal">
                      Urgent (24-48 hours) - Additional fee applies
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <h4 className="font-semibold text-sm mb-2">Estimated Cost</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Second Opinion Consultation</span>
                    <span>₹2,500</span>
                  </div>
                  {urgency === "urgent" && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Urgent Processing</span>
                      <span>₹1,000</span>
                    </div>
                  )}
                  {needsPickup && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Slide Pickup & Delivery</span>
                      <span>₹800</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-border pt-2 font-semibold">
                    <span>Total</span>
                    <span>₹{2500 + (urgency === "urgent" ? 1000 : 0) + (needsPickup ? 800 : 0)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  Submit Case
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
